require('module-alias/register')
var config = require('@localModules/config/Config.js');
var log4js = require('log4js');
var loggerLevel = config.get('LOGGER_LEVEL');
log4js.configure({
  appenders: {
    file: { type: 'file', filename: 'webform.log' },
    out: { type: 'stdout' }
  },
  categories: { default: { appenders: config.get('LOGGER_APPENDERS').split(','), level: loggerLevel } }
});
var logger = log4js.getLogger();

function getLogger() {
  return logger;
}

module.exports = getLogger();
