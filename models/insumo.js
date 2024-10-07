'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insumo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Insumo.belongsTo(models.Proveedor, { foreignKey: 'proveedorId' });
      Insumo.belongsTo(models.Compra, { foreignKey: 'compraId' });
    }
  }
  Insumo.init({
    nombre: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    medida: DataTypes.STRING,
    proveedorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Insumo',
  });
  return Insumo;
};