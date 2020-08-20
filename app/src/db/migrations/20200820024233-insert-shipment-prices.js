'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    var prices = {
      prices: [
        {
          city: "Berazategui",
          price: 150,
          backShipmentPrice: 225
        },
        {
          city: "Berazategui Oeste",
          price: 200,
          backShipmentPrice: 300
        },
        {
          city: "Ezpeleta",
          price: 200,
          backShipmentPrice: 300
        },
        {
          city: "Quilmes",
          price: 250,
          backShipmentPrice: 370
        },
        {
          city: "Quilmes Oeste",
          price: 300,
          backShipmentPrice: 450
        }
      ]
    }

    return queryInterface.bulkInsert('Configurations', [{
      name: 'SHIPMENT_PRICES',
      type: 'Object',
      value: JSON.stringify(prices)
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Configurations', { name: "SHIPMENT_PRICES" }, {})
  }
};
