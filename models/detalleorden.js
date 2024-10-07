'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleOrden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetalleOrden.belongsTo(models.Producto, { foreignKey: 'productoId' });
      DetalleOrden.belongsTo(models.Orden, { foreignKey: 'ordenId' });
    }
  }
  DetalleOrden.init({
    cantidadProducto: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    precioVenta: DataTypes.DECIMAL,
    productoId: DataTypes.INTEGER,
    ordenId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetalleOrden',
  });
  return DetalleOrden;
};