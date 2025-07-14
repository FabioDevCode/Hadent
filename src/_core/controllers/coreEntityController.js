import models from "../../models/index.js";

import dayjs  from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js"; // <- Important

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

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
	createForm: async (req, res, next) => {
		res.render(`e_${req.entity}/create`);
	},
	create: async (req, res, next) => {
		const { flatdatetime, timezone: userTZ } = req.body;

		console.log("--------------------");
		console.log(req.body);
		console.log("--------------------");

		const localDate = dayjs(flatdatetime, "DD/MM/YYYY HH:mm");



		const parsedDate = localDate.tz(userTZ);

		console.log("Locale : ", parsedDate.format("YYYY-MM-DD HH:mm z"));
		console.log("UTC : ", parsedDate.toISOString());


		res.redirect("/dossier/createForm")
		// const item = await models[req.Entity].create(req.body);
		// res.status(201).redirect(`/${req.entity}/show/${item.id}`);
	},

	updateForm: async (req, res, next) => {},
	update: async (req, res, next) => {},
	delete: async (req, res, next) => {},
};
