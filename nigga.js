'use strict';
const { Sequelize } = require('sequelize');
const UsuarioDAO = require('./daos/UsuarioDAO');
const ProveedorDAO = require('./daos/ProveedorDAO');
const InsumoDAO = require('./daos/InsumoDAO');
const ProductoDAO = require('./daos/ProductoDAO');
const OrdenDAO = require('./daos/OrdenDAO');
const CompraDAO = require('./daos/CompraDAO');
const DetalleOrdenDAO = require('./daos/DetalleOrdenDAO');

const sequelize = new Sequelize('nombre_de_la_base_de_datos', 'usuario', 'contraseña', {
    host: 'localhost',
    dialect: 'mysql'
});

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        const nuevoUsuario = await UsuarioDAO.create({
            usuario: 'usuario1',
            contrasena: 'contrasena123'
        });
        console.log('Usuario creado:', nuevoUsuario.toJSON());

        const usuarios = await UsuarioDAO.findAll();
        console.log('Lista de usuarios:', usuarios.map(u => u.toJSON()));

        const usuarioActualizado = await UsuarioDAO.update(nuevoUsuario.id, {
            contrasena: 'nuevaContrasena456'
        });
        console.log('Usuario actualizado:', usuarioActualizado.toJSON());

        await UsuarioDAO.delete(nuevoUsuario.id);
        console.log('Usuario eliminado.');

        const nuevoProveedor = await ProveedorDAO.create({
            nombre: 'Proveedor 1',
            telefono: '123456789'
        });
        console.log('Proveedor creado:', nuevoProveedor.toJSON());

        const proveedores = await ProveedorDAO.findAll();
        console.log('Lista de proveedores:', proveedores.map(p => p.toJSON()));

        const nuevoProducto = await ProductoDAO.create({
            nombre: 'Producto 1',
            precio: 100.00
        });
        console.log('Producto creado:', nuevoProducto.toJSON());

    } catch (error) {
        console.error('Error al conectar a la base de datos o al realizar operaciones:', error);
    } finally {
        await sequelize.close();
        console.log('Conexión a la base de datos cerrada.');
    }
}

main();