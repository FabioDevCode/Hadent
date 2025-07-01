import i18n from "i18n";

export default {
	__: function () {
		// biome-ignore lint/style/noArguments: <explanation>
		return i18n.__.apply(this, arguments);
	},
	__n: function () {
		// biome-ignore lint/style/noArguments: <explanation>
		return i18n.__n.apply(this, arguments);
	},
	log: (context) => {
		console.log(context);
		return;
	},
	slot: function(name, options) {
		if (!this._slots) this._slots = {};
		this._slots[name] = options.fn(this);
	},
	renderSlot: function(name) {
		return (this._slots?.[name]) || '';
	},
	hasModuleAccess: (moduleName, options) => {
		// hasModuleAccess - gestion droits d'accès aux modules
	},
	hasEntityAccess: (entityName, options) => {
		// hasEntityAccess - gestion droits d'accès aux entités
	},
	can: (action, entityName, options) => {
		// can - gestion des accès aux actions CRUD des entités
		// action: create, update, read, delete
	}
};
