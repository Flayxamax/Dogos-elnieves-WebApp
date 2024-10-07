'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Compra.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Compra.hasMany(models.Insumo, { foreignKey: 'compraId' });
    }
  }
  Compra.init({
    fecha: DataTypes.DATE,
    totalCompra: DataTypes.DECIMAL,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Compra',
  });
  return Compra;
};