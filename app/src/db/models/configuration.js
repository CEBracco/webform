'use strict';
module.exports = (sequelize, DataTypes) => {
  const Configuration = sequelize.define('Configuration', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    value: DataTypes.TEXT
  }, {});
  Configuration.associate = function(models) {
    // associations can be defined here
  };
  return Configuration;
};