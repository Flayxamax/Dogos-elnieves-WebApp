'use strict';
const { Compra } = require('../models');

class CompraDAO {
    async create(compraData) {
        return await Compra.create(compraData);
    }

    async findAll() {
        return await Compra.findAll();
    }

    async findById(id) {
        return await Compra.findByPk(id);
    }

    async update(id, compraData) {
        const compra = await this.findById(id);
        return await compra.update(compraData);
    }

    async delete(id) {
        const compra = await this.findById(id);
        return await compra.destroy();
    }
}

module.exports = new CompraDAO();