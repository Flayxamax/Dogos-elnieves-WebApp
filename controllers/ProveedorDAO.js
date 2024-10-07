'use strict';
const { Proveedor } = require('../models');

class ProveedorDAO {
    async create(proveedorData) {
        return await Proveedor.create(proveedorData);
    }

    async findAll() {
        return await Proveedor.findAll();
    }

    async findById(id) {
        return await Proveedor.findByPk(id);
    }

    async update(id, proveedorData) {
        const proveedor = await this.findById(id);
        return await proveedor.update(proveedorData);
    }

    async delete(id) {
        const proveedor = await this.findById(id);
        return await proveedor.destroy();
    }
}

module.exports = new ProveedorDAO();