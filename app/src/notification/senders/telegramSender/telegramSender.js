var messages = require('./messages/messages.js');
var telegramUtils = require('./utils/telegramUtils.js');

function sendNewOrderNotification(order){
  telegramUtils.broadcastMessage(messages.newOrderNotification(order));
}

function sendLabDownloadNotification(downloadLink) {
  telegramUtils.broadcastMessage(messages.labDownloadNotification(downloadLink));
}

module.exports = {
  sendNewOrderNotification: sendNewOrderNotification,
  sendLabDownloadNotification: sendLabDownloadNotification
}
