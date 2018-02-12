'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
            .then(() => {
                return queryInterface.createTable('JbUser', {
                    id: {
                        allowNull: false,
                        type: Sequelize.DataTypes.UUID,
                        primaryKey: true,
                        defaultValue: Sequelize.literal('uuid_generate_v1()'),
                    },
                    firstName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    lastName: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    email: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    location: {
                        type: Sequelize.JSONB
                    },
                    password: {
                        type: Sequelize.STRING,
                        allowNull: false
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
            })

    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('JbUser');
    }
};