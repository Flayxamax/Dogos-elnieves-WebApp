const { DogoError } = require('../utils/DogoError');

const API_URL = 'http://localhost:3000';

class UsuarioController {

    static async crearUsuario(req, res, next) {
        try {
            const { usuario, contrasena, rol } = req.body;
            if (!usuario || !contrasena || !rol) {
                return next(new DogoError('Los campos usuario, contraseña y rol son requeridos', 400));
            }

            const newUsuario = { usuario, contrasena, rol };
            const userResponse = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUsuario),
            });

            if (!userResponse.ok) {
                throw new Error();
            }

            const user = await userResponse.json();
            res.status(201).json(user);
        } catch (error) {
            next(new DogoError('Error al crear usuario', 500));
        }
    }

    static async obtenerUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;
            console.log(`Buscando usuario con ID: ${id}`);

            const userResponse = await fetch(`${API_URL}/usuarios/${id}`);
            if (!userResponse.ok) {
                return next(new DogoError('Usuario no encontrado', 404));
            }

            const usuario = await userResponse.json();
            res.status(200).json(usuario);
        } catch (error) {
            next(new DogoError('Error al obtener el usuario', 500));
        }
    }

    static async obtenerUsuarios(req, res, next) {
        try {
            const usersResponse = await fetch(`${API_URL}/usuarios`);
            const usuarios = await usersResponse.json();

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

            const userExistsResponse = await fetch(`${API_URL}/usuarios/${id}`);
            if (!userExistsResponse.ok) {
                return next(new DogoError('Usuario no encontrado', 404));
            }

            const usuarioData = req.body;
            const userResponse = await fetch(`${API_URL}/usuarios/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioData),
            });

            if (!userResponse.ok) {
                throw new Error();
            }

            const usuario = await userResponse.json();
            res.status(200).json(usuario);
        } catch (error) {
            next(new DogoError('Error al actualizar el usuario', 500));
        }
    }

    static async eliminarUsuario(req, res, next) {
        try {
            const id = req.params.id;

            const userExistsResponse = await fetch(`${API_URL}/usuarios/${id}`);
            if (!userExistsResponse.ok) {
                return next(new DogoError('Usuario no encontrado', 404));
            }

            const deleteResponse = await fetch(`${API_URL}/usuarios/${id}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error();
            }

            res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
        } catch (error) {
            next(new DogoError('Error al eliminar el usuario', 500));
        }
    }
}

module.exports = UsuarioController;
