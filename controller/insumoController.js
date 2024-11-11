const { DogoError } = require('../utils/DogoError');

const API_URL = 'http://localhost:3000';

class InsumoController {
    static async crearInsumo(req, res, next) {
        try {
            const { nombre, cantidad, medida, proveedorId, compraId } = req.body;

            if (!nombre || !cantidad || !medida || !proveedorId || !compraId) {
                return next(new DogoError('Los campos nombre, cantidad, medida, proveedorId y compraId son requeridos.', 400));
            }

            // Verifica si el proveedor existe
            const proveedorResponse = await fetch(`${API_URL}/proveedores/${proveedorId}`);
            if (!proveedorResponse.ok) {
                return next(new DogoError('Proveedor no encontrado.', 404));
            }

            // Verifica si la compra existe
            const compraResponse = await fetch(`${API_URL}/compras/${compraId}`);
            if (!compraResponse.ok) {
                return next(new DogoError('Compra no encontrada.', 404));
            }

            // Crea el insumo
            const insumoResponse = await fetch(`${API_URL}/insumos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, cantidad, medida, proveedorId, compraId }),
            });

            if (!insumoResponse.ok) {
                throw new Error();
            }

            const insumo = await insumoResponse.json();
            res.status(201).json(insumo);
        } catch (error) {
            next(new DogoError('Error al crear insumo', 500));
        }
    }

    static async obtenerInsumos(req, res, next) {
        try {
            const insumosResponse = await fetch(`${API_URL}/insumos`);
            const insumos = await insumosResponse.json();

            if (insumos.length === 0) {
                return next(new DogoError('No hay insumos registrados', 404));
            }

            res.status(200).json(insumos);
        } catch (error) {
            next(new DogoError('Error al obtener insumos', 500));
        }
    }

    static async obtenerInsumoPorId(req, res, next) {
        try {
            const id = req.params.id;
            const insumoResponse = await fetch(`${API_URL}/insumos/${id}`);

            if (!insumoResponse.ok) {
                return next(new DogoError('Insumo no encontrado.', 404));
            }

            const insumo = await insumoResponse.json();
            res.status(200).json(insumo);
        } catch (error) {
            next(new DogoError('Error al obtener el insumo', 500));
        }
    }

    static async actualizarInsumo(req, res, next) {
        try {
            const id = req.params.id;
            const insumoData = req.body;

            // Verifica si el insumo existe
            const insumoExistsResponse = await fetch(`${API_URL}/insumos/${id}`);
            if (!insumoExistsResponse.ok) {
                return next(new DogoError('Insumo no encontrado.', 404));
            }

            const insumoResponse = await fetch(`${API_URL}/insumos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(insumoData),
            });

            if (!insumoResponse.ok) {
                throw new Error();
            }

            const insumo = await insumoResponse.json();
            res.status(200).json(insumo);
        } catch (error) {
            next(new DogoError('Error al actualizar el insumo', 500));
        }
    }

    static async eliminarInsumo(req, res, next) {
        try {
            const id = req.params.id;

            // Verifica si el insumo existe
            const insumoExistsResponse = await fetch(`${API_URL}/insumos/${id}`);
            if (!insumoExistsResponse.ok) {
                return next(new DogoError('Insumo no encontrado.', 404));
            }

            const deleteResponse = await fetch(`${API_URL}/insumos/${id}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error();
            }

            res.status(200).json({ message: 'Insumo eliminado correctamente.' });
        } catch (error) {
            next(new DogoError('Error al eliminar el insumo', 500));
        }
    }
}

module.exports = InsumoController;
