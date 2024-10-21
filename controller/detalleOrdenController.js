const detalleOrdenDAO = require('../dataAccess/DetalleOrdenDAO');
const ordenDAO = require('../dataAccess/OrdenDAO');

class DetalleOrdenController {
    static async crearDetalleOrden(req, res) {
        try {
            const { descripcion, cantidad, precio, ordenId } = req.body;

            if (!descripcion || !cantidad || !precio || !ordenId) {
                return res.status(400).json({ message: 'Los campos descripcion, cantidad, precio y ordenId son requeridos.' });
            }

            // Validar si la orden existe
            const ordenExists = await ordenDAO.findById(ordenId);
            if (!ordenExists) {
                return res.status(404).json({ message: 'Orden no encontrada.' });
            }

            const detalleOrdenData = { descripcion, cantidad, precio, ordenId };
            const detalleOrden = await detalleOrdenDAO.create(detalleOrdenData);
            res.status(201).json(detalleOrden);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el detalle de la orden' });
        }
    }

    static async obtenerDetallesOrden(req, res) {
        try {
            const detallesOrden = await detalleOrdenDAO.findAll();
            if (detallesOrden.length === 0) {
                return res.status(404).json({ message: 'No hay detalles de órdenes registrados' });
            }
            res.status(200).json(detallesOrden);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los detalles de las órdenes' });
        }
    }

    static async obtenerDetalleOrdenPorId(req, res) {
        try {
            const id = req.params.id;
            const detalleOrden = await detalleOrdenDAO.findById(id);

            if (!detalleOrden) {
                return res.status(404).json({ message: 'Detalle de la orden no encontrado.' });
            }

            res.status(200).json(detalleOrden);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el detalle de la orden' });
        }
    }

    static async actualizarDetalleOrden(req, res) {
        try {
            const id = req.params.id;
            const { descripcion, cantidad, precio, ordenId } = req.body;

            const detalleOrdenExists = await detalleOrdenDAO.findById(id);
            if (!detalleOrdenExists) {
                return res.status(404).json({ message: 'Detalle de la orden no encontrado.' });
            }

            // Validar si la orden existe si se actualiza el ordenId
            if (ordenId) {
                const ordenExists = await ordenDAO.findById(ordenId);
                if (!ordenExists) {
                    return res.status(404).json({ message: 'Orden no encontrada.' });
                }
            }

            const detalleOrdenData = { descripcion, cantidad, precio, ordenId };
            const detalleOrden = await detalleOrdenDAO.update(id, detalleOrdenData);
            res.status(200).json(detalleOrden);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el detalle de la orden' });
        }
    }

    static async eliminarDetalleOrden(req, res) {
        try {
            const id = req.params.id;
            const detalleOrdenExists = await detalleOrdenDAO.findById(id);

            if (!detalleOrdenExists) {
                return res.status(404).json({ message: 'Detalle de la orden no encontrado.' });
            }

            await detalleOrdenDAO.delete(id);
            res.status(200).json({ message: 'Detalle de la orden eliminado correctamente.' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el detalle de la orden' });
        }
    }
}

module.exports = DetalleOrdenController;
