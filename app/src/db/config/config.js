require('module-alias/register')
var config = require('@localModules/config/Config.js');

module.exports = {
    development: {
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        host: config.get('DB_HOST'),
        dialect: config.get('DB_DIALECT'),
        define: {
            freezeTableName: true,
            paranoid: true
        }
    }
}