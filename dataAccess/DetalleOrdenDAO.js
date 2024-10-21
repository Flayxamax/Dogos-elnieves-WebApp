'use strict';
const { DetalleOrden } = require('../models');

class DetalleOrdenDAO {
    async create(detalleOrdenData) {
        return await DetalleOrden.create(detalleOrdenData);
    }

    async findAll() {
        return await DetalleOrden.findAll();
    }

    async findById(id) {
        return await DetalleOrden.findByPk(id);
    }

    async update(id, detalleOrdenData) {
        const detalleOrden = await this.findById(id);
        return await detalleOrden.update(detalleOrdenData);
    }

    async delete(id) {
        const detalleOrden = await this.findById(id);
        return await detalleOrden.destroy();
    }
}

module.exports = new DetalleOrdenDAO();