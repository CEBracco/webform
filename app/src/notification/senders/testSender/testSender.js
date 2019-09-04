const logger = require('@localModules/logger/Logger');


function sendNewOrderNotification(order) {
    logger.debug("NOTIFICATION: You Have a new Order!");
}

module.exports = {
    sendNewOrderNotification: sendNewOrderNotification
}