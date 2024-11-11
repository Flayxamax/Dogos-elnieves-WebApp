const { DogoError } = require('../utils/DogoError');

const API_URL = 'http://localhost:3000';

class OrdenController {
    static async crearOrden(req, res, next) {
        try {
            const { numero, fechaHora, total, usuarioId } = req.body;

            if (!numero || !fechaHora || !total || !usuarioId) {
                return next(new DogoError('Los campos numero, fechaHora, total y usuarioId son requeridos.', 400));
            }

            // Verifica si el usuario existe
            const usuarioResponse = await fetch(`${API_URL}/usuarios/${usuarioId}`);
            if (!usuarioResponse.ok) {
                return next(new DogoError('Usuario no encontrado.', 404));
            }

            // Crea la orden
            const ordenResponse = await fetch(`${API_URL}/ordenes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numero, fechaHora, total, usuarioId }),
            });

            if (!ordenResponse.ok) {
                throw new Error();
            }

            const orden = await ordenResponse.json();
            res.status(201).json(orden);
        } catch (error) {
            next(new DogoError('Error al crear la orden', 500));
        }
    }

    static async obtenerOrdenes(req, res, next) {
        try {
            const ordenesResponse = await fetch(`${API_URL}/ordenes`);
            const ordenes = await ordenesResponse.json();

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
            const ordenResponse = await fetch(`${API_URL}/ordenes/${id}`);

            if (!ordenResponse.ok) {
                return next(new DogoError('Orden no encontrada.', 404));
            }

            const orden = await ordenResponse.json();
            res.status(200).json(orden);
        } catch (error) {
            next(new DogoError('Error al obtener la orden', 500));
        }
    }

    static async actualizarOrden(req, res, next) {
        try {
            const id = req.params.id;
            const { numero, fechaHora, total, usuarioId } = req.body;

            // Verifica si la orden existe
            const ordenExistsResponse = await fetch(`${API_URL}/ordenes/${id}`);
            if (!ordenExistsResponse.ok) {
                return next(new DogoError('Orden no encontrada.', 404));
            }

            // Verifica si el usuario existe (si se incluye `usuarioId` en la solicitud)
            if (usuarioId) {
                const usuarioResponse = await fetch(`${API_URL}/usuarios/${usuarioId}`);
                if (!usuarioResponse.ok) {
                    return next(new DogoError('Usuario no encontrado.', 404));
                }
            }

            // Actualiza la orden
            const ordenResponse = await fetch(`${API_URL}/ordenes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numero, fechaHora, total, usuarioId }),
            });

            if (!ordenResponse.ok) {
                throw new Error();
            }

            const orden = await ordenResponse.json();
            res.status(200).json(orden);
        } catch (error) {
            next(new DogoError('Error al actualizar la orden', 500));
        }
    }

    static async eliminarOrden(req, res, next) {
        try {
            const id = req.params.id;

            // Verifica si la orden existe
            const ordenExistsResponse = await fetch(`${API_URL}/ordenes/${id}`);
            if (!ordenExistsResponse.ok) {
                return next(new DogoError('Orden no encontrada.', 404));
            }

            // Elimina la orden
            const deleteResponse = await fetch(`${API_URL}/ordenes/${id}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error();
            }

            res.status(200).json({ message: 'Orden eliminada correctamente.' });
        } catch (error) {
            next(new DogoError('Error al eliminar la orden', 500));
        }
    }
}

module.exports = OrdenController;
