'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Orders', 'status', {
      type: Sequelize.STRING,
      after: "completed",
      defaultValue: "pending"
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Orders', 'status');
  }
};