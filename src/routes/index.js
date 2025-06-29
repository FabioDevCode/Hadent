import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import setLayoutForEntity from "../_core/middlewares/setLayoutForEntity.js";
const prefixOverrides = createRequire(import.meta.url)("./_prefixRoutesConfig.json");
const entities = createRequire(import.meta.url)("../config/entities.json");
const customRoutesFiles = fs.readdirSync(__dirname);

const routeFileExists = (entity) => customRoutesFiles.includes(`${entity}.routes.js`);

export default async (app) => {
	for (const entity of Object.keys(entities)) {
		const Entity = entity.charAt(0).toUpperCase() + entity.slice(1);
		const fileName = `${entity}.routes.js`;
		let routePath = `/${entity}`;

		const prefix = prefixOverrides[entity];

		if (prefix === false) {
			// Routes sans préfixe
			routePath = "/";
		}
		if (typeof prefix === "string") {
			// Péfixe de routes custom
			routePath = prefix.startsWith("/") ? prefix : `/${prefix}`;
		}

		// Chemin au fichier de route (custom ou core)
		const filePath = routeFileExists(entity)
			? path.join(__dirname, fileName)
			: path.join(__dirname, "../_core/routes/coreEntityRoutes.js");

		try {
			const module = await import(filePath);
			const routes = module.default;

			if (!routes) {
				console.error(`Aucun router n'est exporté : ${filePath}`);
				continue;
			}

			const setEntityMiddleware = (req, res, next) => {
				req.entity = entity;
				req.Entity = Entity;
				next();
			};

			app.use(routePath, setEntityMiddleware, setLayoutForEntity, routes);
		} catch (err) {
			console.error(`Erreur en important les routes de ${entity} → ${err.message}`);
		}
	}
};
