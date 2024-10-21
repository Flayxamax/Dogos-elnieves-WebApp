const usuarioDAO = require('../dataAccess/UsuarioDAO');
const { DogoError } = require('../utils/DogoError');

class UsuarioController {

    static async crearUsuario(req, res, next) {
        try {
            const { usuario, contrasena, rol } = req.body;
            if (!usuario || !contrasena || !rol) {
                return next(new DogoError('Los campos usuario, contraseña y rol son requeridos', 400));
            }
            const newUsuario = { usuario, contrasena, rol };
            const user = await usuarioDAO.create(newUsuario);
            res.status(201).json(user);
        } catch (error) {
            next(new DogoError('Error al crear usuario', 500));
        }
    }

    static async obtenerUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;
            console.log(`Buscando usuario con ID: ${id}`);
            const usuario = await usuarioDAO.findById(id);

            if (!usuario) {
                return next(new DogoError('Usuario no encontrado', 404));
            }

            res.status(200).json(usuario);
        } catch (error) {
            next(new DogoError('Error al obtener el usuario', 500));
        }
    }

    static async obtenerUsuarios(req, res, next) {
        try {
            const usuarios = await usuarioDAO.findAll();

            if (usuarios.length === 0) {
                return next(new DogoError('No hay usuarios registrados', 404));
            }

            res.status(200).json(usuarios);
        } catch (error) {
            next(new DogoError('Error al obtener los usuarios', 500));
        }
    }

    static async actualizarUsuario(req, res, next) {
        try {
            const id = req.params.id;

            const usuarioexists = await usuarioDAO.findById(id);
            if (!usuarioexists) {
                return next(new DogoError('Usuario no encontrado', 404));
            }

            const usuarioData = req.body;
            const usuario = await usuarioDAO.update(id, usuarioData);

            if (!usuario) {
                return next(new DogoError('Usuario no encontrado', 404));
            }

            res.status(200).json(usuario);
        } catch (error) {
            next(new DogoError('Error al actualizar el usuario', 500));
        }
    }

    static async eliminarUsuario(req, res, next) {
        try {
            const id = req.params.id;
            const usuarioexists = await usuarioDAO.findById(id);

            if (!usuarioexists) {
                return next(new DogoError('Usuario no encontrado', 404));
            }

            await usuarioDAO.delete(id);
            res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
        } catch (error) {
            next(new DogoError('Error al eliminar el usuario', 500));
        }
    }

}

module.exports = UsuarioController;