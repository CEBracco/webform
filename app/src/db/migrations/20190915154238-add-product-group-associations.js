'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Products', // name of Source model
      'groupId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Groups', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Products', // name of Source model
      'groupId' // key we want to remove
    );
  }
};