'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Variations', 'index', {
      type: Sequelize.INTEGER,
      after: "type"
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Variations', 'index');
  }
};