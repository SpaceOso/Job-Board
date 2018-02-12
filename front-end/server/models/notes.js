'use strict';
module.exports = (sequelize, DataTypes) => {
	const Notes = sequelize.define('Notes', {
		id:{
			allowNull: false,
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: sequelize.literal('uuid_generate_v1()')
		},
		note:{
			type: DataTypes.STRING
		}
	});

	return Notes;
};