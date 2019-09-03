var messages = require('./messages/messages.js');
var telegramUtils = require('./utils/telegramUtils.js');

function sendNewOrderNotification(order){
  telegramUtils.broadcastMessage(messages.newOrderNotification(order));
}

module.exports = {
  sendNewOrderNotification: sendNewOrderNotification
}
