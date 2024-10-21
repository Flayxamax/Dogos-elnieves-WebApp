'use strict';
const { Sequelize } = require('sequelize');
const express = require('express');
const app = express();
const morgan = require('morgan');
const productorouter = require('./routes/productoRouter');
const usuariorouter = require('./routes/usuarioRouter');
const proveedorrouter = require('./routes/proveedorRouter');
const comprarouter = require('./routes/compraRouter');
const insumorouter = require('./routes/insumoRouter');
const {globalErrorHandler, DogoError} = require('./utils/DogoError');

const sequelize = new Sequelize('dogoselnieves', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        app.use(express.json());
        app.use(morgan('combined'));

        app.use('/productos', productorouter);
        app.use('/usuarios', usuariorouter);
        app.use('/proveedor', proveedorrouter);
        app.use('/compra', comprarouter);
        app.use('/insumo', insumorouter);

        app.use(globalErrorHandler)
        
        const port = process.env.PORT || 3000;
        
        app.listen(port, () => {
            console.log(`servidor escuchando en el puerto ${port}`)
        })

    } catch (error) {
        console.error('Error al conectar a la base de datos o al realizar operaciones:', error);
    } finally {
        // await sequelize.close();
        // console.log('Conexión a la base de datos cerrada.');
    }
}

main();