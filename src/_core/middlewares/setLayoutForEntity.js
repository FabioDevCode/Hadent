import entities from "../../config/entities.js";

export default function setLayoutForEntity(req, res, next) {
    const entity = req.entity;
    const module = entities[entity];

    if (module) {
        res.locals.layout = module;
        res.locals.module = module;
    } else {
        res.locals.layout = false;
        res.locals.module = null;
    }

    next();
}