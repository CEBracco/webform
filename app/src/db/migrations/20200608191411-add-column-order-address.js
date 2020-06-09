'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Orders', 'address', {
      type: Sequelize.TEXT,
      after: "instagramUser"
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Orders', 'address');
  }
};