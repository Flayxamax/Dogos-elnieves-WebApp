'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orden.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
      Orden.hasMany(models.DetalleOrden, { foreignKey: 'ordenId' });
    }
  }
  Orden.init({
    fechaHora: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orden',
  });
  return Orden;
};