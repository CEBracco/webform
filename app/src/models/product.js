const Sequelize = require('sequelize');
const sequelize = global.dbConnection;

class Product extends Sequelize.Model { }
Product.init({
    name: Sequelize.STRING,
    image: Sequelize.STRING
}, {
    sequelize, 
    modelName: 'product'
});

module.exports = Product