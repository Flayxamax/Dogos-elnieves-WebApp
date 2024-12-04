const usuarioDAO = require("../dataAccess/UsuarioDAO");
const { DogoError } = require('../utils/DogoError');
const jwt = require('jsonwebtoken');

class UsuarioController {

    static async login(req, res, next) {
        try {
            const { usuario, contrasena } = req.body;

            if (!usuario || !contrasena) {
                return next(new DogoError('Usuario y contraseña son requeridos', 400));
            }

            const userFound = await usuarioDAO.authUser(usuario, contrasena);

            console.log(userFound);

            if (!userFound) {
                return next(new DogoError('Usuario o contraseña incorrectos', 401));
            }

            const rol = userFound.rol;
            if (rol !== 'ADMIN' && rol !== 'CAJERO') {
                return next(new DogoError('Acceso denegado. Rol no autorizado', 403));
            }

            const payload = {
                userId: userFound.id,
                username: userFound.usuario,
                role: rol,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({
                msg: 'Inicio de sesión exitoso',
                token,
                role: rol,
                usuario: {
                    id: userFound.id,
                    usuario: userFound.usuario,
                    rol: rol,
                },
            });
        } catch (error) {
            console.error('Error en login:', error.message);
            next(new DogoError('Error al iniciar sesión', 500));
        }
    }
}

module.exports = UsuarioController;