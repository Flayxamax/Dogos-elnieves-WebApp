'use strict';
const { Producto } = require('../models');

class ProductoDAO {
    async create(productoData) {
        return await Producto.create(productoData);
    }

    async findAll() {
        return await Producto.findAll();
    }

    async findById(id) {
        return await Producto.findByPk(id);
    }

    async update(id, productoData) {
        const producto = await this.findById(id);
        return await producto.update(productoData);
    }

    async delete(id) {
        const producto = await this.findById(id);
        return await producto.destroy();
    }
}

module.exports = new ProductoDAO();