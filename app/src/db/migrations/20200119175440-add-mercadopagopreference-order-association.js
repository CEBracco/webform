'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'MercadoPagoPreferences', // name of Source model
      'orderId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        after: "paymentId",
        references: {
          model: 'Orders', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'MercadoPagoPreferences', // name of Source model
      'orderId' // key we want to remove
    );
  }
};