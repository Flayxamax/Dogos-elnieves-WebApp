'use strict';
const { Insumo } = require('../models');

class InsumoDAO {
    async create(insumoData) {
        return await Insumo.create(insumoData);
    }

    async findAll() {
        return await Insumo.findAll();
    }

    async findById(id) {
        return await Insumo.findByPk(id);
    }

    async update(id, insumoData) {
        const insumo = await this.findById(id);
        return await insumo.update(insumoData);
    }

    async delete(id) {
        const insumo = await this.findById(id);
        return await insumo.destroy();
    }
}

module.exports = new InsumoDAO();