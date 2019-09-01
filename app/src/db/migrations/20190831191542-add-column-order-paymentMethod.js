'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Orders', 'paymentMethod', {
      type: Sequelize.STRING,
      after: "instagramUser"
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Orders', 'paymentMethod');
  }
};