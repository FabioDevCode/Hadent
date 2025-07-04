import { createRequire } from "node:module";
const entities = createRequire(import.meta.url)("../../config/entities.json");

export default function setLayoutForEntity(req, res, next) {
	const entity = req.entity;
	const module = entities[entity];

	if(entity && entity !== 'default') {
		res.locals.entity = entity;
	} else {
		res.locals.entity = null;
	}

	if (module) {
		res.locals.layout = module;
		res.locals.module = module;
	} else {
		res.locals.layout = false;
		res.locals.module = null;
	}

	next();
}
