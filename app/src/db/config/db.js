'use strict';
require('module-alias/register')
var config = require('@localModules/config/Config.js');
var fs = require('fs');
var Sequelize = require('sequelize');
var modelsPath = 'app/src/db/models';
var db = {};

const sequelize = new Sequelize(config.get('DB_NAME'), config.get('DB_USER'), config.get('DB_PASSWORD'), {
    host: config.get('DB_HOST'),
    define: {
        paranoid: true
    },
    dialect: config.get('DB_DIALECT')
})

fs
    .readdirSync(modelsPath)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = sequelize['import']('../models/' + file);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;