'use strict';
module.exports = (sequelize, DataTypes) => {
	const JobApplications = sequelize.define('JobApplications', {
			id: {
				allowNull: false,
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: sequelize.literal('uuid_generate_v1()'),
			}
		},
		{
			// disable the modification of tablenames; By default, sequelize will automatically
			// transform all passed model names (first parameter of define) into plural.
			// if you don't want that, set the following
			freezeTableName: true,
		}
	);

	JobApplications.associate = (models) => {
		JobApplications.belongsTo(models.Job, {foreignKey: 'jobId'});
		JobApplications.belongsTo(models.Applicants, {foreignKey: 'applicantId'});
	};
	return JobApplications;
};