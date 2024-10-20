const compraDAO = require('../dataAccess/CompraDAO'); 
const usuarioDAO = require('../dataAccess/UsuarioDAO'); 

class CompraController {
    static async crearCompra(req, res) {
        try {
            const { fecha, totalCompra, idUsuario } = req.body;
            if (!fecha || !totalCompra || !idUsuario) {
                return res.status(400).json({ message: 'Los campos fecha, totalCompra y idUsuario son requeridos' });
            }
            const usuario = await usuarioDAO.findById(idUsuario);
            if (!usuario) {
                return res.status(404).json({ message: 'El usuario no existe' });
            }
            const nuevaCompra = { fecha, totalCompra, idUsuario };
            const compra = await compraDAO.create(nuevaCompra);
            res.status(201).json(compra);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la compra' });
        }
    }

    static async obtenerCompraPorId(req, res) {
        try {
            const id = req.params.id;
            const compra = await compraDAO.findById(id);
            if (!compra) {
                return res.status(404).json({ message: 'Compra no encontrada' });
            }
            res.status(200).json(compra);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la compra' });
        }
    }

    static async obtenerCompras(req, res) {
        try {
            const compras = await compraDAO.findAll();
            if (compras.length === 0) {
                return res.status(404).json({ message: 'No hay compras registradas' });
            }
            res.status(200).json(compras);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las compras' });
        }
    }

    static async actualizarCompra(req, res) {
        try {
            const id = req.params.id;
            const compraExists = await compraDAO.findById(id);
            if (!compraExists) {
                return res.status(404).json({ message: 'Compra no encontrada' });
            }
            const { idUsuario } = req.body;

            if (idUsuario) {
                const usuario = await usuarioDAO.findById(idUsuario);
                if (!usuario) {
                    return res.status(404).json({ message: 'El usuario no existe' });
                }
             }
            const compraData = req.body;
            const compra = await compraDAO.update(id, compraData);
            res.status(200).json(compra);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la compra' });
        }
    }

    static async eliminarCompra(req, res) {
        try {
            const id = req.params.id;
            const compraExists = await compraDAO.findById(id);
            if (!compraExists) {
                return res.status(404).json({ message: 'Compra no encontrada' });
            }
            await compraDAO.delete(id);
            res.status(200).json({ message: 'Compra eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la compra' });
        }
    }
}

module.exports = CompraController;
