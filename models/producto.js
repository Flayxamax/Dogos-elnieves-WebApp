'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producto.hasMany(models.DetalleOrden, { foreignKey: 'productoId' });
      Producto.belongsTo(models.Insumo, { foreignKey: 'insumoId' });
    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    categoria: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};