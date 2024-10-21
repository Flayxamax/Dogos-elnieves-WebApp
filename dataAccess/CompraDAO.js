'use strict';
const { Compra } = require('../models');

class CompraDAO {
    async create(compraData) {
        try {
            return await Compra.create(compraData);
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await Compra.findAll();
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            return await Compra.findByPk(id);
        } catch (error) {
            throw error;
        }
    }

    async update(id, compraData) {
        try {
            const compra = await this.findById(id);
            if (!compra) {
                return null;
            }
            return await compra.update(compraData);
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const compra = await this.findById(id);
            if (!compra) {
                return null;
            }
            return await compra.destroy();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CompraDAO();
