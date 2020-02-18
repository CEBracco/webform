'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Products', 'enabled', {
      type: Sequelize.BOOLEAN,
      after: "acceptedPhotos",
      defaultValue: true
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Products', 'enabled');
  }
};