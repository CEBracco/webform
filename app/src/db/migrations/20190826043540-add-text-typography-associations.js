'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Texts', // name of Source model
      'typographyId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Variations', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Texts', // name of Source model
      'typographyId' // key we want to remove
    );
  }
};