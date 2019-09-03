const logger = require('@localModules/logger/Logger');
var config = require('@localModules/config/Config');
var senders = [];

if (config.get('NOTIFICATION_SENDERS') && config.get('NOTIFICATION_SENDERS') != ''){
  for (sender of config.get('NOTIFICATION_SENDERS').split(',')) {
     senders.push(require(`./senders/${sender}Sender/${sender}Sender`));
  }
}

function sendNewOrderNotification(order){
  logger.debug('Sending new order notifications!');
  for (sender of senders) {
    sender.sendNewOrderNotification(order);
  }
}

module.exports = {
  sendNewOrderNotification: sendNewOrderNotification
}
