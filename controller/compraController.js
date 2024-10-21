const compraDAO = require('../dataAccess/CompraDAO'); 
const usuarioDAO = require('../dataAccess/UsuarioDAO'); 

const {DogoError} = require('../utils/DogoError');

class CompraController {
    static async crearCompra(req, res, next) {
        try {
            const { fecha, totalCompra, idUsuario } = req.body;
            if (!fecha || !totalCompra || !idUsuario) {
                return next(new DogoError('Los campos fecha, totalCompra y idUsuario son requeridos', 400));
            }
            const usuario = await usuarioDAO.findById(idUsuario);
            if (!usuario) {
                return next(new DogoError('El usuario no existe', 404));

            }
            const nuevaCompra = { fecha, totalCompra, idUsuario };
            const compra = await compraDAO.create(nuevaCompra);
            res.status(201).json(compra);
        } catch (error) {

            next(new DogoError('Error al crear la compra', 500));
        }
    }

    static async obtenerCompraPorId(req, res, next) {
        try {
            const id = req.params.id;
            const compra = await compraDAO.findById(id);
            if (!compra) {

                return next(new DogoError('Compra no encontrada', 404));
            }
            res.status(200).json(compra);
        } catch (error) {
            next(new DogoError('Error al obtener la compra', 500));
        }
    }

    static async obtenerCompras(req, res, next) {
        try {
            const compras = await compraDAO.findAll();
            if (compras.length === 0) {
                return next(new DogoError('No hay compras registradas', 404));
            }
            res.status(200).json(compras);
        } catch (error) {
            next(new DogoError('Error al obtener las compras', 500));
        }
    }

    static async actualizarCompra(req, res, next) {
        try {
            const id = req.params.id;
            const compraExists = await compraDAO.findById(id);
            if (!compraExists) {
                return next(new DogoError('Compra no encontrada', 404));
            }

            const { idUsuario } = req.body;
            if (idUsuario) {
                const usuario = await usuarioDAO.findById(idUsuario);
                if (!usuario) {
                    return next(new DogoError('El usuario no existe', 404));
                }
            }
          
            const compraData = req.body;
            const compra = await compraDAO.update(id, compraData);
            res.status(200).json(compra);
        } catch (error) {

            next(new DogoError('Error al actualizar la compra', 500));
        }
    }

    static async eliminarCompra(req, res, next) {

        try {
            const id = req.params.id;
            const compraExists = await compraDAO.findById(id);
            if (!compraExists) {

                return next(new DogoError('Compra no encontrada', 404));

            }
            await compraDAO.delete(id);
            res.status(200).json({ message: 'Compra eliminada correctamente' });
        } catch (error) {

            next(new DogoError('Error al eliminar la compra', 500));

        }
    }
}

module.exports = CompraController;
