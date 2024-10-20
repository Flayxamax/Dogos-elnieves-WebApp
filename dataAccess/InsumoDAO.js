'use strict';
const { Insumo } = require('../models');

class InsumoDAO {
    async create(insumoData) {
        try {
            return await Insumo.create(insumoData);
        } catch (error) {
            throw error; 
        }
    }

    async findAll() {
        try {
            return await Insumo.findAll(); 
        } catch (error) {
            throw error; 
        }
    }

    async findById(id) {
        try {
            return await Insumo.findByPk(id); 
        } catch (error) {
            throw error; 
        }
    }

    async update(id, insumoData) {
        try {
            const insumo = await this.findById(id);
            if (!insumo) {
                return null; 
            }
            return await insumo.update(insumoData);
        } catch (error) {
            throw error; 
        }
    }

    async delete(id) {
        try {
            const insumo = await this.findById(id);
            if (!insumo) {
                return null; 
            }
            return await insumo.destroy(); 
        } catch (error) {
            throw error; 
        }
    }
}

module.exports = new InsumoDAO();
