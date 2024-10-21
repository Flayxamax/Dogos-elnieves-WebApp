'use strict';
const { Producto } = require('../models');

class ProductoDAO {
    async create(productoData) {
        try {
            return await Producto.create(productoData);
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await Producto.findAll();
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            return await Producto.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    async update(id, productoData) {
        try {
            const producto = await this.findById(id);
            if (!producto) {
                return null;
            }
            return await producto.update(productoData);
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const producto = await this.findById(id);
            if (!producto) {
                return null;
            }
            return await producto.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductoDAO();
