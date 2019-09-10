'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Products', 'paymentLink', {
      type: Sequelize.TEXT,
      after: "acceptedPhotos"
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Products', 'paymentLink');
  }
};