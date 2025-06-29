import { createRequire } from "node:module";
import * as builder from "../helpers/models_hlps.js";
const attributes = createRequire(import.meta.url)("./attributes/dossier.attributes.json");
const relations = createRequire(import.meta.url)("./relations/dossier.relations.json");

export default function (sequelize) {
	const attributes_build = builder.buildAttributes(attributes);
	const options = {
		sequelize,
		tableName: "dossier",
		timestamps: true,
		indexes: builder.buildIndexes(attributes),
	};

	const Model = sequelize.define("Dossier", attributes_build, options);
	Model.associate = builder.buildRelations("Dossier", relations);

	return Model;
}
