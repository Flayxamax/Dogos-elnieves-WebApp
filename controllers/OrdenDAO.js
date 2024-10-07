'use strict';
const { Orden } = require('../models');

class OrdenDAO {
    async create(ordenData) {
        return await Orden.create(ordenData);
    }

    async findAll() {
        return await Orden.findAll();
    }

    async findById(id) {
        return await Orden.findByPk(id);
    }

    async update(id, ordenData) {
        const orden = await this.findById(id);
        return await orden.update(ordenData);
    }

    async delete(id) {
        const orden = await this.findById(id);
        return await orden.destroy();
    }
}

module.exports = new OrdenDAO();