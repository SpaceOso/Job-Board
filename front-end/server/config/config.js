const dotenv = require('dotenv').config();

module.exports = {
    "development": {
        "username": process.env.DEV_DB_USER,
        "password": process.env.DEV_DB_PASS,
        "database": process.env.DEV_DB,
        "host": process.env.DEV_DB_HOST,
        "port": process.env.DEV_DB_PORT,
        "dialect": "postgres"
    },
	"production":{
		"username": process.env.DB_USER,
		"password": process.env.DB_PASS,
		"database": process.env.DB,
		"host": process.env.DB_HOST,
		"port": process.env.DB_PORT,
		"dialect": "postgres",
		"ssl": true,
	},
};