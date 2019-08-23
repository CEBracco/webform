'use strict';
module.exports = (sequelize, DataTypes) => {
  const Variation = sequelize.define('Variation', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  Variation.associate = function(models) {
    // associations can be defined here
  };
  return Variation;
};