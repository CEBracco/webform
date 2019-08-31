'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Products', 'acceptedPhotos', {
      type: Sequelize.INTEGER,
      after: "image"
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Products', 'acceptedPhotos');
  }
};