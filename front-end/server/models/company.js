"use strict";

module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {
            id: {
                allowNull: false,
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize.literal('uuid_generate_v1()'),
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            location: {
                type: DataTypes.JSONB,
                allowNull: false,
            },
            logoImg: {
                type: DataTypes.STRING,
            },
            website: {
                type: DataTypes.STRING,
            },
            twitter: {
                type: DataTypes.STRING,
            },
            facebook: {
                type: DataTypes.STRING,
            },
            linkedIn: {
                type: DataTypes.STRING,
            },
        },
        {
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
        });

    Company.associate = (models) => {
        Company.hasMany(models.JbUser, {foreignKey: "companyId", as:'users'});
		Company.hasMany(models.Job, {foreignKey: 'companyId', as:'jobs'});
		Company.hasMany(models.JobApplications, {foreignKey: 'companyId', as:'jobApplicants'});
    };

    return Company;
};