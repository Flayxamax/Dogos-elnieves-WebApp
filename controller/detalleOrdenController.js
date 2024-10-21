const detalleOrdenDAO = require('../dataAccess/DetalleOrdenDAO');
const ordenDAO = require('../dataAccess/OrdenDAO');
const { DogoError } = require('../utils/DogoError');

class DetalleOrdenController {

    static async crearDetalleOrden(req, res, next) {
        try {
            const { descripcion, cantidad, precio, ordenId } = req.body;

            if (!descripcion || !cantidad || !precio || !ordenId) {
                return next(new DogoError('Los campos descripcion, cantidad, precio y ordenId son requeridos.', 400));
            }

            const ordenExists = await ordenDAO.findById(ordenId);
            if (!ordenExists) {
                return next(new DogoError('Orden no encontrada.', 404));
            }

            const detalleOrdenData = { descripcion, cantidad, precio, ordenId };
            const detalleOrden = await detalleOrdenDAO.create(detalleOrdenData);
            res.status(201).json(detalleOrden);
        } catch (error) {
            next(new DogoError('Error al crear el detalle de la orden', 500));
        }
    }

    static async obtenerDetallesOrden(req, res, next) {
        try {
            const detallesOrden = await detalleOrdenDAO.findAll();
            if (detallesOrden.length === 0) {
                return next(new DogoError('No hay detalles de órdenes registrados', 404));
            }
            res.status(200).json(detallesOrden);
        } catch (error) {
            next(new DogoError('Error al obtener los detalles de las órdenes', 500));
        }
    }

    static async obtenerDetalleOrdenPorId(req, res, next) {
        try {
            const id = req.params.id;
            const detalleOrden = await detalleOrdenDAO.findById(id);

            if (!detalleOrden) {
                return next(new DogoError('Detalle de la orden no encontrado.', 404));
            }

            res.status(200).json(detalleOrden);
        } catch (error) {
            next(new DogoError('Error al obtener el detalle de la orden', 500));
        }
    }

    static async actualizarDetalleOrden(req, res, next) {
        try {
            const id = req.params.id;
            const { descripcion, cantidad, precio, ordenId } = req.body;

            const detalleOrdenExists = await detalleOrdenDAO.findById(id);
            if (!detalleOrdenExists) {
                return next(new DogoError('Detalle de la orden no encontrado.', 404));
            }

            if (ordenId) {
                const ordenExists = await ordenDAO.findById(ordenId);
                if (!ordenExists) {
                    return next(new DogoError('Orden no encontrada.', 404));
                }
            }

            const detalleOrdenData = { descripcion, cantidad, precio, ordenId };
            const detalleOrden = await detalleOrdenDAO.update(id, detalleOrdenData);
            res.status(200).json(detalleOrden);
        } catch (error) {
            next(new DogoError('Error al actualizar el detalle de la orden', 500));
        }
    }

    static async eliminarDetalleOrden(req, res, next) {
        try {
            const id = req.params.id;
            const detalleOrdenExists = await detalleOrdenDAO.findById(id);

            if (!detalleOrdenExists) {
                return next(new DogoError('Detalle de la orden no encontrado.', 404));
            }

            await detalleOrdenDAO.delete(id);
            res.status(200).json({ message: 'Detalle de la orden eliminado correctamente.' });
        } catch (error) {
            next(new DogoError('Error al eliminar el detalle de la orden', 500));
        }
    }
}

module.exports = DetalleOrdenController;
