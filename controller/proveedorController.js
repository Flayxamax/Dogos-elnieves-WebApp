const proveedorDAO = require('../dataAccess/ProveedorDAO'); 

class ProveedorController {
    static async crearProveedor(req, res) {
        try {
            const { nombre, telefono } = req.body;
            if (!nombre || !telefono) {
                return res.status(400).json({ message: 'Los campos nombre y teléfono son requeridos' });
            }
            const nuevoProveedor = { nombre, telefono };
            const proveedor = await proveedorDAO.create(nuevoProveedor);
            res.status(201).json(proveedor);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear proveedor' });
        }
    }

    static async obtenerProveedorPorId(req, res) {
        try {
            const id = req.params.id;
            const proveedor = await proveedorDAO.findById(id);
            if (!proveedor) {
                return res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            res.status(200).json(proveedor);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el proveedor' });
        }
    }

    static async obtenerProveedores(req, res) {
        try {
            const proveedores = await proveedorDAO.findAll();
            if (proveedores.length === 0) {
                return res.status(404).json({ message: 'No hay proveedores registrados' });
            }
            res.status(200).json(proveedores);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los proveedores' });
        }
    }

    static async actualizarProveedor(req, res) {
        try {
            const id = req.params.id;
            const proveedorExists = await proveedorDAO.findById(id);
            if (!proveedorExists) {
                return res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            const proveedorData = req.body;
            const proveedor = await proveedorDAO.update(id, proveedorData);
            res.status(200).json(proveedor);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el proveedor' });
        }
    }

    static async eliminarProveedor(req, res) {
        try {
            const id = req.params.id;
            const proveedorExists = await proveedorDAO.findById(id);
            if (!proveedorExists) {
                return res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            await proveedorDAO.delete(id);
            res.status(200).json({ message: 'Proveedor eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el proveedor' });
        }
    }
}

module.exports = ProveedorController;
