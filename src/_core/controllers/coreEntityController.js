import models from "../../models/index.js";

export default {
    show: async(req, res) => {
        const item = await models[req.Entity].findByPk(req.params.id);
        if (!item) {
            const error = new Error(`${req.Entity} #${req.params.id} introuvable.`);
            error.status = 404;
            throw error; // to errorHandler
        }
        res.render('', {
            entityName: req.entity,
            entity: item
        })
    },

    list: async(req, res) => {},
    dataList: async(req, res) => {
        const items = await models[req.Entity].findAll();
    },

    createForm: async(req, res) => {},
    create: async(req, res) => {
        // Voir comment faire des étapes pour controller
    },

    updateForm: async(req, res) => {},
    update: async(req, res) => {},

    delete: async(req, res) => {}
};