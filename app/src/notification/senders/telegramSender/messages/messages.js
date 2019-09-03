var config=require('../../../../config/config.js');

function newOrderNotification(order){
  return `there is a new order!!`;
}

module.exports = {
  newOrderNotification: newOrderNotification
}
