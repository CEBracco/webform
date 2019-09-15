'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};