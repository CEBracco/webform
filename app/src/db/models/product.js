'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    acceptedPhotos: DataTypes.INTEGER,
    enabled: DataTypes.BOOLEAN
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Group);
  };
  return Product;
};