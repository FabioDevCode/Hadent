import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import routeConfigurations from "./_config.js";
const excluded_files = ["_config.js", "index.js"];

export default async (app) => {
	for (const file of fs.readdirSync(__dirname)) {
		if (!excluded_files.includes(file)) {
			const routeConfig = routeConfigurations[file];
			const routePath = routeConfig
				? routeConfig.path
				: `/${file.split(".")[0]}`;
			const middlewares = routeConfig ? routeConfig.middlewares : [];
			const filePath = path.join(__dirname, file);

			try {
				const module = await import(filePath);
				const routes = module.default;

				if (routes) {
					if (middlewares.length > 0) {
						app.use(routePath, ...middlewares, routes);
					} else {
						app.use(routePath, routes);
					}
				} else {
					console.error(
						`Error: This route file ${file} does not export a router.`,
					);
				}
			} catch (err) {
				console.error(`Error loading route from ${file}: ${err.message}`);
			}
		}
	}
};
