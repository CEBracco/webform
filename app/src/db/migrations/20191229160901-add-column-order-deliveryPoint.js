'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Orders', 'deliveryPoint', {
      type: Sequelize.STRING,
      after: "deliveryMethod"
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Orders', 'deliveryPoint');
  }
};