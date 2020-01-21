'use strict';
module.exports = (sequelize, DataTypes) => {
  const MercadoPagoPreference = sequelize.define('MercadoPagoPreference', {
    preferenceId: DataTypes.STRING,
    preferenceUrl: DataTypes.STRING,
    preferenceCreationDate: DataTypes.DATE,
    status: DataTypes.STRING,
    paymentDate: DataTypes.DATE,
    paymentId: DataTypes.STRING
  }, {});
  MercadoPagoPreference.associate = function(models) {
    MercadoPagoPreference.belongsTo(models.Order);
  };
  return MercadoPagoPreference;
};