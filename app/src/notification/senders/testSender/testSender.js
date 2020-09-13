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

function sendLabDownloadNotification(downloadLink) {
    var logMessages = config.getBoolean('TEST_SENDER_LOG_NOTIFICATIONS');
    logger.debug("NOTIFICATION: The Lab download an order!");
    if (logMessages) {
        logger.debug(messages.labDownloadNotification(downloadLink))
    }
}

module.exports = {
    sendNewOrderNotification: sendNewOrderNotification,
    sendLabDownloadNotification: sendLabDownloadNotification
}