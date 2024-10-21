const insumoDAO = require('../dataAccess/InsumoDAO');
const proveedorDAO = require('../dataAccess/ProveedorDAO');
const compraDAO = require('../dataAccess/CompraDAO');

const { DogoError } = require('../utils/DogoError');

class InsumoController {
    static async crearInsumo(req, res, next) {

        try {
            const { nombre, cantidad, medida, proveedorId, compraId } = req.body;

            if (!nombre || !cantidad || !medida || !proveedorId || !compraId) {
                return next(new DogoError('Los campos nombre, cantidad, medida, proveedorId y compraId son requeridos.', 400));
            }

            const proveedorExists = await proveedorDAO.findById(proveedorId);
            if (!proveedorExists) {
                return next(new DogoError('Proveedor no encontrado.', 404));
            }

            const compraExists = await compraDAO.findById(compraId);
            if (!compraExists) {
                return next(new DogoError('Compra no encontrada.', 404));
            }

            const insumoData = { nombre, cantidad, medida, proveedorId, compraId };
            const insumo = await insumoDAO.create(insumoData);
            res.status(201).json(insumo);
        } catch (error) {
            next(new DogoError('Error al crear insumo', 500));
        }
    }

    static async obtenerInsumos(req, res, next) {
        try {
            const insumos = await insumoDAO.findAll();
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
            const insumo = await insumoDAO.findById(id);

            if (!insumo) {
                return next(new DogoError('Insumo no encontrado.', 404));
            }

            res.status(200).json(insumo);
        } catch (error) {
            next(new DogoError('Error al obtener el insumo', 500));
        }
    }

    static async actualizarInsumo(req, res, next) {
        try {
            const id = req.params.id;
            const insumoData = req.body;

            const insumoExists = await insumoDAO.findById(id);
            if (!insumoExists) {
                return next(new DogoError('Insumo no encontrado.', 404));
            }

            const insumo = await insumoDAO.update(id, insumoData);
            res.status(200).json(insumo);
        } catch (error) {

            next(new DogoError('Error al actualizar el insumo', 500));
        }
    }

    static async eliminarInsumo(req, res, next) {
        try {
            const id = req.params.id;
            const insumoExists = await insumoDAO.findById(id);

            if (!insumoExists) {
                return next(new DogoError('Insumo no encontrado.', 404));
            }

            await insumoDAO.delete(id);
            res.status(200).json({ message: 'Insumo eliminado correctamente.' });
        } catch (error) {
            next(new DogoError('Error al eliminar el insumo', 500));
        }
    }
}

module.exports = InsumoController;
