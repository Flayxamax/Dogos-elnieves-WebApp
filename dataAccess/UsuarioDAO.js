'use strict';
const { Usuario } = require('../models');

class UsuarioDAO {
    async create(usuarioData) {
        try {
            const usuario = await Usuario.create(usuarioData);
            return usuario;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try{
            return await Usuario.findAll();
        }catch(error){
            throw error;
        }
    }

    async findById(id) {
        try{
            return await Usuario.findByPk(id);
        }catch(error){
            throw error;
        }
    }

    async update(id, usuarioData) {
        try{
            const usuario = await this.findById(id);
            if (!usuario) {
                return null;
            }
            return await usuario.update(usuarioData);
        }catch(error){
            throw error;
        }
    }

    async delete(id) {
        try{
            const usuario = await this.findById(id);
             if (!usuario) {
                return null;
            }
            return await usuario.destroy();
        }catch(error){
            throw error;
        }
    }
}

module.exports = new UsuarioDAO();