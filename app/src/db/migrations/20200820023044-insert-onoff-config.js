'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var config = { 
      disabled: false, 
      title: "Información", 
      detail: "Estamos actualizando nuestro shop online, en momentos se encontrará disponible nuevamente. <a href='https://www.instagram.com/florbarraufotografia'>www.instagram.com/florbarraufotografia</a><br>", 
      link: "https://www.instagram.com/florbarraufotografia" 
    }

    return queryInterface.bulkInsert('Configurations', [{
      name: 'SITE_DISABLED',
      type: 'Object',
      value: JSON.stringify(config)
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Configurations', { name: "SITE_DISABLED" }, {})
  }
};
