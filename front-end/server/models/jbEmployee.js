module.exports = (sequelize, DataTypes) => {
    "use strict";
    const JbEmployee = sequelize.define("JbEmployee", {
		    id: {
			    allowNull: false,
			    type: DataTypes.UUID,
			    primaryKey: true,
			    defaultValue: sequelize.literal('uuid_generate_v1()'),
		    },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
				unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
        });

    JbEmployee.associate = (models) => {
        JbEmployee.belongsTo(models.Company, {foreignKey: "companyId"});
    };

    return JbEmployee;
};
