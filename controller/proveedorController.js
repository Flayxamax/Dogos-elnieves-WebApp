const { DogoError } = require('../utils/DogoError');

const API_URL = 'http://localhost:3000';

class ProveedorController {
    static async crearProveedor(req, res, next) {
        try {
            const { nombre, telefono } = req.body;
            if (!nombre || !telefono) {
                return next(new DogoError('Los campos nombre y teléfono son requeridos', 400));
            }

            const nuevoProveedor = { nombre, telefono };
            const proveedorResponse = await fetch(`${API_URL}/proveedores`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProveedor),
            });

            if (!proveedorResponse.ok) {
                throw new Error();
            }

            const proveedor = await proveedorResponse.json();
            res.status(201).json(proveedor);
        } catch (error) {
            next(new DogoError('Error al crear proveedor', 500));
        }
    }

    static async obtenerProveedorPorId(req, res, next) {
        try {
            const id = req.params.id;
            const proveedorResponse = await fetch(`${API_URL}/proveedores/${id}`);

            if (!proveedorResponse.ok) {
                return next(new DogoError('Proveedor no encontrado', 404));
            }

            const proveedor = await proveedorResponse.json();
            res.status(200).json(proveedor);
        } catch (error) {
            next(new DogoError('Error al obtener el proveedor', 500));
        }
    }

    static async obtenerProveedores(req, res, next) {
        try {
            const proveedoresResponse = await fetch(`${API_URL}/proveedores`);
            const proveedores = await proveedoresResponse.json();

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

            // Verifica si el proveedor existe
            const proveedorExistsResponse = await fetch(`${API_URL}/proveedores/${id}`);
            if (!proveedorExistsResponse.ok) {
                return next(new DogoError('Proveedor no encontrado', 404));
            }

            const proveedorData = req.body;
            const proveedorResponse = await fetch(`${API_URL}/proveedores/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(proveedorData),
            });

            if (!proveedorResponse.ok) {
                throw new Error();
            }

            const proveedor = await proveedorResponse.json();
            res.status(200).json(proveedor);
        } catch (error) {
            next(new DogoError('Error al actualizar el proveedor', 500));
        }
    }

    static async eliminarProveedor(req, res, next) {
        try {
            const id = req.params.id;

            // Verifica si el proveedor existe
            const proveedorExistsResponse = await fetch(`${API_URL}/proveedores/${id}`);
            if (!proveedorExistsResponse.ok) {
                return next(new DogoError('Proveedor no encontrado', 404));
            }

            // Elimina el proveedor
            const deleteResponse = await fetch(`${API_URL}/proveedores/${id}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error();
            }

            res.status(200).json({ message: 'Proveedor eliminado correctamente' });
        } catch (error) {
            next(new DogoError('Error al eliminar el proveedor', 500));
        }
    }
}

module.exports = ProveedorController;
