'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        'use strict';
        return queryInterface.createTable('Employer', {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            id: {
                allowNull: false,
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.literal('uuid_generate_v1()'),
            },
            location: {
                type: Sequelize.JSONB,
                allowNull: false
            },
            logoImg: {
                type: Sequelize.STRING,
            },
            website: {
                type: Sequelize.STRING,
            },
            twitter: {
                type: Sequelize.STRING,
            },
            facebook: {
                type: Sequelize.STRING,
            },
            linkedIn: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Employer');
    }
};