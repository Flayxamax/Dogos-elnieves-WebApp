const ordenDAO = require('../dataAccess/OrdenDAO');
const usuarioDAO = require('../dataAccess/UsuarioDAO');

class OrdenController {
    static async crearOrden(req, res) {
        try {
            const { numero, fechaHora, total, usuarioId } = req.body;

            if (!numero || !fechaHora || !total || !usuarioId) {
                return res.status(400).json({ message: 'Los campos numero, fechaHora, total y usuarioId son requeridos.' });
            }

            // Validar si el usuario existe
            const usuarioExists = await usuarioDAO.findById(usuarioId);
            if (!usuarioExists) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            const ordenData = { numero, fechaHora, total, usuarioId };
            const orden = await ordenDAO.create(ordenData);
            res.status(201).json(orden);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la orden' });
        }
    }

    static async obtenerOrdenes(req, res) {
        try {
            const ordenes = await ordenDAO.findAll();
            if (ordenes.length === 0) {
                return res.status(404).json({ message: 'No hay órdenes registradas' });
            }
            res.status(200).json(ordenes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las órdenes' });
        }
    }

    static async obtenerOrdenPorId(req, res) {
        try {
            const id = req.params.id;
            const orden = await ordenDAO.findById(id);

            if (!orden) {
                return res.status(404).json({ message: 'Orden no encontrada.' });
            }

            res.status(200).json(orden);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la orden' });
        }
    }

    static async actualizarOrden(req, res) {
        try {
            const id = req.params.id;
            const { numero, fechaHora, total, usuarioId } = req.body;

            const ordenExists = await ordenDAO.findById(id);
            if (!ordenExists) {
                return res.status(404).json({ message: 'Orden no encontrada.' });
            }

            // Validar si el usuario existe si se actualiza el usuarioId
            if (usuarioId) {
                const usuarioExists = await usuarioDAO.findById(usuarioId);
                if (!usuarioExists) {
                    return res.status(404).json({ message: 'Usuario no encontrado.' });
                }
            }

            const ordenData = { numero, fechaHora, total, usuarioId };
            const orden = await ordenDAO.update(id, ordenData);
            res.status(200).json(orden);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la orden' });
        }
    }

    static async eliminarOrden(req, res) {
        try {
            const id = req.params.id;
            const ordenExists = await ordenDAO.findById(id);

            if (!ordenExists) {
                return res.status(404).json({ message: 'Orden no encontrada.' });
            }

            await ordenDAO.delete(id);
            res.status(200).json({ message: 'Orden eliminada correctamente.' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la orden' });
        }
    }
}

module.exports = OrdenController;
