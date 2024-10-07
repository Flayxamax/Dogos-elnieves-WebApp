'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleOrdens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidadProducto: {
        type: Sequelize.INTEGER
      },
      subtotal: {
        type: Sequelize.DECIMAL
      },
      precioVenta: {
        type: Sequelize.DECIMAL
      },
      productoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Productos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      ordenId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Ordens',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleOrdens');
  }
};