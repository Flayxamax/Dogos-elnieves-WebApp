'use strict';
const { Proveedor } = require('../models');

class ProveedorDAO {
    async create(proveedorData) {
        try {
            return await Proveedor.create(proveedorData);
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await Proveedor.findAll();
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            return await Proveedor.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    async update(id, proveedorData) {
        try {
            const proveedor = await this.findById(id);
            if (!proveedor) {
                return null;
            }
            return await proveedor.update(proveedorData);
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const proveedor = await this.findById(id);
            if (!proveedor) {
                return null;
            }
            return await proveedor.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProveedorDAO();
