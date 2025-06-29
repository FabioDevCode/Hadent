import models from "../../models/index.js";

export default {
	show: async (req, res, next) => {
		const item = await models[req.Entity].findByPk(req.params.id);

		if (!item) {
			const error = new Error(`${req.Entity} #${req.params.id} introuvable.`);
			error.status = 404;
			throw error; // to errorHandler
		}

		res.render("", {
			entityName: req.entity,
			entity: item,
		});
	},
	list: async (req, res, next) => {},
	datalist: async (req, res, next) => {
		const items = await models[req.Entity].findAll();
	},

	createForm: async (req, res, next) => {},
	create: async (req, res, next) => {
		const item = await models[req.Entity].create(req.body);

		res.status(201).redirect(`/${req.entity}/show/${item.id}`);
	},

	updateForm: async (req, res, next) => {},
	update: async (req, res, next) => {},
	delete: async (req, res, next) => {},
};
