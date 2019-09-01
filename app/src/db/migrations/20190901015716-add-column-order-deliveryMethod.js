'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Orders', 'deliveryMethod', {
      type: Sequelize.STRING,
      after: "paymentMethod"
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Orders', 'deliveryMethod');
  }
};