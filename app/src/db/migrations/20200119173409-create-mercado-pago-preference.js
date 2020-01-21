'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MercadoPagoPreferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      preferenceId: {
        type: Sequelize.STRING
      },
      preferenceUrl: {
        type: Sequelize.STRING
      },
      preferenceCreationDate: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      paymentId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MercadoPagoPreferences');
  }
};