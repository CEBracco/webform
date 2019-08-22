require('module-alias/register')
var config = require('@localModules/config/Config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.get('DB_NAME'), config.get('DB_USER'), config.get('DB_PASSWORD'), {
    host: config.get('DB_HOST'),
    define: {
        freezeTableName: true,
        paranoid: true
    },
    dialect: 'mysql'
})

module.exports = sequelize