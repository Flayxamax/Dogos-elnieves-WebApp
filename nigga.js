'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './variables.env'});
const { globalErrorHandler, DogoError } = require('./utils/DogoError');
const validateJWT = require('./utils/DogoJWT'); // Middleware para validar JWT
const cors = require('cors');
app.use(cors());

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

// Middleware para proteger rutas según el rol
const protegerRutasRol = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({
                msg: `Acceso denegado. Esta ruta es solo para usuarios con rol: ${role}`,
            });
        }
        next();
    };
};

async function main() {
    try {
        // Autenticación de la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        // Middleware
        app.use(express.json());
        app.use(morgan('combined'));

        // Configurar rutas protegidas
        //app.use('/productos', validateJWT, protegerRutasRol('ADMIN'), productorouter);
        //app.use('/DogosFrontend/Productos/productos.html', validateJWT, protegerRutasRol('ADMIN'), productorouter);


        // Rutas no protegidas
        app.use('/productos', productorouter);
        app.use('/usuarios', usuariorouter);
        app.use('/proveedor', proveedorrouter);
        app.use('/compra', comprarouter);
        app.use('/insumo', insumorouter);
        app.use('/detalleorden', detalleordenrouter);
        app.use('/orden', ordenrouter);

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