'use strict';
module.exports = (sequelize, DataTypes) => {
  const Text = sequelize.define('Text', {
    value: DataTypes.STRING
  }, {});
  Text.associate = function(models) {
    Text.belongsTo(models.Variation, { as: "Typography" });
  };
  return Text;
};