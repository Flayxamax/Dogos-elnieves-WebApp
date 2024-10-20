const insumoDAO = require('../dataAccess/InsumoDAO');
const proveedorDAO = require('../dataAccess/ProveedorDAO');
const compraDAO = require('../dataAccess/CompraDAO');

class InsumoController {
    static async crearInsumo(req, res) {
        try {
            const { nombre, cantidad, medida, proveedorId, compraId } = req.body;

            if (!nombre || !cantidad || !medida || !proveedorId || !compraId) {
                return res.status(400).json({ message: 'Los campos nombre, cantidad, medida, proveedorId y compraId son requeridos.' });
            }

            const proveedorExists = await proveedorDAO.findById(proveedorId);
            if (!proveedorExists) {
                return res.status(404).json({ message: 'Proveedor no encontrado.' });
            }

            const compraExists = await compraDAO.findById(compraId);
            if (!compraExists) {
                return res.status(404).json({ message: 'Compra no encontrada.' });
            }

            const insumoData = { nombre, cantidad, medida, proveedorId, compraId };
            const insumo = await insumoDAO.create(insumoData);
            res.status(201).json(insumo);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear insumo' });
        }
    }

    static async obtenerInsumos(req, res) {
        try {
            const insumos = await insumoDAO.findAll();
            if (insumos.length === 0) {
                //TO DO middleware errores
                return res.status(404).json({ message: 'No hay insumos registrados' });
            }
            res.status(200).json(insumos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener insumos' });
        }
    }

    static async obtenerInsumoPorId(req, res) {
        try {
            const id = req.params.id;
            const insumo = await insumoDAO.findById(id);

            if (!insumo) {
                return res.status(404).json({ message: 'Insumo no encontrado.' });
            }

            res.status(200).json(insumo);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el insumo' });
        }
    }

    static async actualizarInsumo(req, res) {
        try {
            const id = req.params.id;
            const insumoData = req.body;

            const insumoExists = await insumoDAO.findById(id);
            if (!insumoExists) {
                return res.status(404).json({ message: 'Insumo no encontrado.' });
            }

            const insumo = await insumoDAO.update(id, insumoData);
            res.status(200).json(insumo);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el insumo' });
        }
    }

    static async eliminarInsumo(req, res) {
        try {
            const id = req.params.id;
            const insumoExists = await insumoDAO.findById(id);

            if (!insumoExists) {
                return res.status(404).json({ message: 'Insumo no encontrado.' });
            }

            await insumoDAO.delete(id);
            res.status(200).json({ message: 'Insumo eliminado correctamente.' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el insumo' });
        }
    }
}

module.exports = InsumoController;
