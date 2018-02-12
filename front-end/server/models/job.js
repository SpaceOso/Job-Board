module.exports = (sequelize, DataTypes) => {

    const Job = sequelize.define('Job', {
            id: {
                allowNull: false,
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize.literal('uuid_generate_v1()'),
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
			location: {
				type: DataTypes.JSONB,
				allowNull: false,
			},
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
        }
    );

    Job.associate = (models) => {
        "use strict";
		Job.belongsTo(models.Employer, {foreignKey: 'employerId', onDelete: 'CASCADE'});
        Job.hasMany(models.Applicants, {foreignKey: 'jobId', onDelete: 'CASCADE'});
    };
    return Job;
};
