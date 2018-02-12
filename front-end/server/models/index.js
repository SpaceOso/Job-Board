require('dotenv').config();
const fs = require('fs');
const path = require('path');

//rquired for production
const pg = require('pg');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
console.log("the env is:", env);
const config= require(`${__dirname}/../config/config.js`)[env]; //env is the property of the config object
// const config= require(`${__dirname}/../config/config.js`)['production']; //env is the property of the config object
const db = {};

if(env === 'production'){
	pg.defaults.ssl = true;
}

let sequelize;
sequelize = new Sequelize(
	// config.database, config.username, config.password, config
	config.database, config.username, config.password, config
);


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

fs
    .readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        console.log(model);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;