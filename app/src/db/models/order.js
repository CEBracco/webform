'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    hash: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    cellphone: DataTypes.STRING,
    instagramUser: DataTypes.STRING,
    address: DataTypes.TEXT,
    paymentMethod: DataTypes.STRING,
    deliveryMethod: DataTypes.STRING,
    deliveryPoint: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.Product);
    Order.belongsTo(models.Variation, { as: "Background" });
    Order.belongsTo(models.Text);
  };
  return Order;
};