const ordenDAO = require('../dataAccess/OrdenDAO');
const usuarioDAO = require('../dataAccess/UsuarioDAO');
const { DogoError } = require('../utils/DogoError');

class OrdenController {
    static async crearOrden(req, res, next) {
        try {
            const { numero, fechaHora, total, usuarioId } = req.body;

            if (!numero || !fechaHora || !total || !usuarioId) {
                return next(new DogoError('Los campos numero, fechaHora, total y usuarioId son requeridos.', 400));
            }

            const usuarioExists = await usuarioDAO.findById(usuarioId);
            if (!usuarioExists) {
                return next(new DogoError('Usuario no encontrado.', 404));
            }

            const ordenData = { numero, fechaHora, total, usuarioId };
            const orden = await ordenDAO.create(ordenData);
            res.status(201).json(orden);
        } catch (error) {
            next(new DogoError('Error al crear la orden', 500));
        }
    }

    static async obtenerOrdenes(req, res, next) {
        try {
            const ordenes = await ordenDAO.findAll();
            if (ordenes.length === 0) {
                return next(new DogoError('No hay órdenes registradas', 404));
            }
            res.status(200).json(ordenes);
        } catch (error) {
            next(new DogoError('Error al obtener las órdenes', 500));
        }
    }

    static async obtenerOrdenPorId(req, res, next) {
        try {
            const id = req.params.id;
            const orden = await ordenDAO.findById(id);

            if (!orden) {
                return next(new DogoError('Orden no encontrada.', 404));
            }

            res.status(200).json(orden);
        } catch (error) {
            next(new DogoError('Error al obtener la orden', 500));
        }
    }

    static async actualizarOrden(req, res, next) {
        try {
            const id = req.params.id;
            const { numero, fechaHora, total, usuarioId } = req.body;

            const ordenExists = await ordenDAO.findById(id);
            if (!ordenExists) {
                return next(new DogoError('Orden no encontrada.', 404));
            }

            if (usuarioId) {
                const usuarioExists = await usuarioDAO.findById(usuarioId);
                if (!usuarioExists) {
                    return next(new DogoError('Usuario no encontrado.', 404));
                }
            }

            const ordenData = { numero, fechaHora, total, usuarioId };
            const orden = await ordenDAO.update(id, ordenData);
            res.status(200).json(orden);
        } catch (error) {
            next(new DogoError('Error al actualizar la orden', 500));
        }
    }

    static async eliminarOrden(req, res, next) {
        try {
            const id = req.params.id;
            const ordenExists = await ordenDAO.findById(id);

            if (!ordenExists) {
                return next(new DogoError('Orden no encontrada.', 404));
            }

            await ordenDAO.delete(id);
            res.status(200).json({ message: 'Orden eliminada correctamente.' });
        } catch (error) {
            next(new DogoError('Error al eliminar la orden', 500));
        }
    }
}

module.exports = OrdenController;
