'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Variations', 'emptyOption', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "type"
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Variations', 'emptyOption');
  }
};