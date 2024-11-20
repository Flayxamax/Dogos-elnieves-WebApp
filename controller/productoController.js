const { DogoError } = require('../utils/DogoError');
const productoDAO = require('../dataAccess/ProductoDAO');

class ProductoController {
    static async crearProducto(req, res, next) {
        try {
            const { nombre, precio, insumoId } = req.body;
            if (!nombre || !precio || !insumoId) {
                return next(new DogoError('Los campos nombre, precio e insumoId son requeridos', 400));
            }

            const productoData = { nombre, precio, insumoId };
            const producto = await productoDAO.create(productoData);
            res.status(201).json(producto);
        } catch (error) {
            next(new DogoError('Error al crear producto', 500));
        }
    }

    static async obtenerProductoPorId(req, res, next) {
        try {
            const id = req.params.id;
            const producto = await productoDAO.findById(id);

            if (!producto) {
                return next(new DogoError('Producto no encontrado', 404));
            }

            res.status(200).json(producto);
        } catch (error) {
            next(new DogoError('Error al obtener el producto', 500));
        }
    }

    static async obtenerProductos(req, res, next) {
        try {
            const productos = await productoDAO.findAll();

            if (productos.length === 0) {
                return next(new DogoError('No hay productos registrados', 404));
            }

            res.status(200).json(productos);
        } catch (error) {
            next(new DogoError('Error al obtener los productos', 500));
        }
    }

    static async actualizarProducto(req, res, next) {
        try {
            const id = req.params.id;
            const productoData = req.body;

            const producto = await productoDAO.update(id, productoData);

            if (!producto) {
                return next(new DogoError('Producto no encontrado', 404));
            }

            res.status(200).json(producto);
        } catch (error) {
            next(new DogoError('Error al actualizar el producto', 500));
        }
    }

    static async eliminarProducto(req, res, next) {
        try {
            const id = req.params.id;

            const producto = await productoDAO.delete(id);

            if (!producto) {
                return next(new DogoError('Producto no encontrado', 404));
            }

            res.status(200).json({ mensaje: 'Producto Eliminado Correctamente' });
        } catch (error) {
            next(new DogoError('Error al eliminar el producto', 500));
        }
    }
}

module.exports = ProductoController;