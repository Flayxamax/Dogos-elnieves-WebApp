'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar variables de entorno
const { globalErrorHandler, DogoError } = require('./utils/DogoError');
const validateJWT = require('./utils/validateJWT'); // Middleware para validar JWT

// Importar routers
const productorouter = require('./routes/productoRouter');
const usuariorouter = require('./routes/usuarioRouter');
const proveedorrouter = require('./routes/proveedorRouter');
const comprarouter = require('./routes/compraRouter');
const insumorouter = require('./routes/insumoRouter');
const detalleordenrouter = require('./routes/detalleOrdenRouter');
const ordenrouter = require('./routes/ordenRouter');

// Conectar a la base de datos utilizando Sequelize
const { Sequelize } = require('sequelize');

// Configurar Sequelize con las variables de entorno
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

async function main() {
    try {
        // Autenticación de la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        // Middleware
        app.use(express.json());
        app.use(morgan('combined'));

        // Rutas de la API
        app.use('/productos', productorouter);
        app.use('/usuarios', usuariorouter);
        app.use('/proveedor', proveedorrouter);
        app.use('/compra', comprarouter);
        app.use('/insumo', insumorouter);
        app.use('/detalleorden', detalleordenrouter);
        app.use('/orden', ordenrouter);

        // Ruta de autenticación
        app.post('/api/usuario/iniciarsesion', async (req, res) => {
            const { usuario, contrasena } = req.body;

            // Verificar si el usuario existe en la base de datos
            const usuarioEncontrado = await Usuario.findOne({ where: { usuario } });
            if (!usuarioEncontrado || usuarioEncontrado.contrasena !== contrasena) {
                return res.status(401).json({ msg: 'Usuario o contraseña inválidos' });
            }

            // Verificar el rol del usuario (admin o cajero)
            let rol = usuarioEncontrado.rol;

            if (rol !== 'admin' && rol !== 'cajero') {
                return res.status(403).json({ msg: 'Acceso denegado. Rol no autorizado' });
            }

            const payload = {
                userId: usuarioEncontrado.id,
                username: usuarioEncontrado.usuario,
                role: rol,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({
                msg: 'Inicio de sesión exitoso',
                token,
                role: rol,
            });
        });

        // Rutas protegidas con autenticación JWT
        const protegerRutasRol = (role) => {
            return (req, res, next) => {
                if (req.user.role !== role) {
                    return res.status(403).json({
                        msg: `Acceso denegado. Esta ruta es solo para usuarios con rol: ${role}`
                    });
                }
                next();
            };
        };

        // Protege las rutas según el rol del usuario
        app.use('/productos', validateJWT, protegerRutasRol('admin'), productorouter);
        app.use('/orden', validateJWT, protegerRutasRol('cajero'), ordenrouter);

        // Manejo de errores
        app.use(globalErrorHandler);

        // Iniciar el servidor
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        });

    } catch (error) {
        console.error('Error al conectar a la base de datos o al realizar operaciones:', error);
    }
}

main();