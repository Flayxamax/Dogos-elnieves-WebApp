'use strict';
const { Usuario } = require('../models');

class UsuarioDAO {
    async create(usuarioData) {
        return await Usuario.create(usuarioData);
    }

    async findAll() {
        return await Usuario.findAll();
    }

    async findById(id) {
        return await Usuario.findByPk(id);
    }

    async update(id, usuarioData) {
        const usuario = await this.findById(id);
        return await usuario.update(usuarioData);
    }

    async delete(id) {
        const usuario = await this.findById(id);
        return await usuario.destroy();
    }
}

module.exports = new UsuarioDAO();