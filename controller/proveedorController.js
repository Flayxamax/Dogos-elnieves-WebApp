const proveedorDAO = require('../dataAccess/ProveedorDAO');
const { DogoError } = require('../utils/DogoError');

class ProveedorController {
    static async crearProveedor(req, res, next) {
        try {
            const { nombre, telefono } = req.body;
            if (!nombre || !telefono) {
                return next(new DogoError('Los campos nombre y teléfono son requeridos', 400));
            }
            const nuevoProveedor = { nombre, telefono };
            const proveedor = await proveedorDAO.create(nuevoProveedor);
            res.status(201).json(proveedor);
        } catch (error) {
            next(new DogoError('Error al crear proveedor', 500));
        }
    }

    static async obtenerProveedorPorId(req, res, next) {
        try {
            const id = req.params.id;
            const proveedor = await proveedorDAO.findById(id);
            if (!proveedor) {
                return next(new DogoError('Proveedor no encontrado', 404));
            }
            res.status(200).json(proveedor);
        } catch (error) {
            next(new DogoError('Error al obtener el proveedor', 500));
        }
    }

    static async obtenerProveedores(req, res, next) {
        try {
            const proveedores = await proveedorDAO.findAll();
            if (proveedores.length === 0) {
                return next(new DogoError('No hay proveedores registrados', 404));
            }
            res.status(200).json(proveedores);
        } catch (error) {
            next(new DogoError('Error al obtener los proveedores', 500));
        }
    }

    static async actualizarProveedor(req, res, next) {
        try {
            const id = req.params.id;
            const proveedorExists = await proveedorDAO.findById(id);
            if (!proveedorExists) {
                return next(new DogoError('Proveedor no encontrado', 404));
            }
            const proveedorData = req.body;
            const proveedor = await proveedorDAO.update(id, proveedorData);
            res.status(200).json(proveedor);
        } catch (error) {
            next(new DogoError('Error al actualizar el proveedor', 500));
        }
    }

    static async eliminarProveedor(req, res, next) {
        try {
            const id = req.params.id;
            const proveedorExists = await proveedorDAO.findById(id);
            if (!proveedorExists) {
                return next(new DogoError('Proveedor no encontrado', 404));
            }
            await proveedorDAO.delete(id);
            res.status(200).json({ message: 'Proveedor eliminado correctamente' });
        } catch (error) {
            next(new DogoError('Error al eliminar el proveedor', 500));
        }
    }
}

module.exports = ProveedorController;
