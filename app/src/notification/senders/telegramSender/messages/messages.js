var config = require('@localModules/config/Config');

function newOrderNotification(order){
  return `there is a new order!!`;
}

module.exports = {
  newOrderNotification: newOrderNotification
}
