var config = require('@localModules/config/Config');
const logger = require('@localModules/logger/Logger');
var messages = require('./messages/messages.js');


function sendNewOrderNotification(order) {
    var logMessages = config.getBoolean('TEST_SENDER_LOG_NOTIFICATIONS');
    logger.debug("NOTIFICATION: You Have a new Order!");
    if (logMessages) {
        logger.debug(messages.newOrderNotification(order))
    }
}

module.exports = {
    sendNewOrderNotification: sendNewOrderNotification
}