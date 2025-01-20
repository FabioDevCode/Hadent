import * as builder from '../helpers/models_hlps.js';
import attributes from './attributes/user.attributes.json' assert { type: 'json' };
import relations from './relations/user.relations.json' assert { type: 'json' };

export default function(sequelize) {
    const attributes_build = builder.buildAttributes(attributes);
    const options = {
        sequelize,
        tableName: 'user',
        timestamps: true,
        indexes: builder.buildIndexes(attributes)
    }

    const Model = sequelize.define('User', attributes_build, options);
    Model.associate = builder.buildRelations('User', relations);

    return Model;
}