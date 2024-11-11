const { DogoError } = require('../utils/DogoError');

const API_URL = 'http://localhost:3000';

class DetalleOrdenController {
    static async crearDetalleOrden(req, res, next) {
        try {
            const { descripcion, cantidad, precio, ordenId } = req.body;

            if (!descripcion || !cantidad || !precio || !ordenId) {
                return next(new DogoError('Los campos descripcion, cantidad, precio y ordenId son requeridos.', 400));
            }

            // Verifica la existencia de la orden
            const ordenResponse = await fetch(`${API_URL}/ordenes/${ordenId}`);
            if (!ordenResponse.ok) {
                return next(new DogoError('Orden no encontrada.', 404));
            }

            // Crea el detalle de la orden
            const detalleOrdenResponse = await fetch(`${API_URL}/detallesOrden`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descripcion, cantidad, precio, ordenId }),
            });

            if (!detalleOrdenResponse.ok) {
                throw new Error();
            }

            const detalleOrden = await detalleOrdenResponse.json();
            res.status(201).json(detalleOrden);
        } catch (error) {
            next(new DogoError('Error al crear el detalle de la orden', 500));
        }
    }

    static async obtenerDetallesOrden(req, res, next) {
        try {
            const detallesOrdenResponse = await fetch(`${API_URL}/detallesOrden`);
            const detallesOrden = await detallesOrdenResponse.json();

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
            const detalleOrdenResponse = await fetch(`${API_URL}/detallesOrden/${id}`);

            if (!detalleOrdenResponse.ok) {
                return next(new DogoError('Detalle de la orden no encontrado.', 404));
            }

            const detalleOrden = await detalleOrdenResponse.json();
            res.status(200).json(detalleOrden);
        } catch (error) {
            next(new DogoError('Error al obtener el detalle de la orden', 500));
        }
    }

    static async actualizarDetalleOrden(req, res, next) {
        try {
            const id = req.params.id;
            const { descripcion, cantidad, precio, ordenId } = req.body;

            // Verifica si el detalle de la orden existe
            const detalleOrdenExistsResponse = await fetch(`${API_URL}/detallesOrden/${id}`);
            if (!detalleOrdenExistsResponse.ok) {
                return next(new DogoError('Detalle de la orden no encontrado.', 404));
            }

            // Verifica si la orden existe
            if (ordenId) {
                const ordenExistsResponse = await fetch(`${API_URL}/ordenes/${ordenId}`);
                if (!ordenExistsResponse.ok) {
                    return next(new DogoError('Orden no encontrada.', 404));
                }
            }

            const detalleOrdenResponse = await fetch(`${API_URL}/detallesOrden/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descripcion, cantidad, precio, ordenId }),
            });

            if (!detalleOrdenResponse.ok) {
                throw new Error();
            }

            const detalleOrden = await detalleOrdenResponse.json();
            res.status(200).json(detalleOrden);
        } catch (error) {
            next(new DogoError('Error al actualizar el detalle de la orden', 500));
        }
    }

    static async eliminarDetalleOrden(req, res, next) {
        try {
            const id = req.params.id;

            // Verifica si el detalle de la orden existe
            const detalleOrdenExistsResponse = await fetch(`${API_URL}/detallesOrden/${id}`);
            if (!detalleOrdenExistsResponse.ok) {
                return next(new DogoError('Detalle de la orden no encontrado.', 404));
            }

            const deleteResponse = await fetch(`${API_URL}/detallesOrden/${id}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error();
            }

            res.status(200).json({ message: 'Detalle de la orden eliminado correctamente.' });
        } catch (error) {
            next(new DogoError('Error al eliminar el detalle de la orden', 500));
        }
    }
}

module.exports = DetalleOrdenController;
