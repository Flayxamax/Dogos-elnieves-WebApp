const { DogoError } = require('../utils/DogoError');

const API_URL = 'http://localhost:3000';

class ProductoController {
    static async crearProducto(req, res, next) {
        try {
            const { nombre, precio, insumoId } = req.body;
            if (!nombre || !precio || !insumoId) {
                return next(new DogoError('Los campos nombre, precio e insumoId son requeridos', 400));
            }

            // Verifica si el insumo existe
            const insumoResponse = await fetch(`${API_URL}/insumos/${insumoId}`);
            if (!insumoResponse.ok) {
                return next(new DogoError('El insumo no existe', 404));
            }

            // Crea el producto
            const productoResponse = await fetch(`${API_URL}/productos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, precio, insumoId }),
            });

            if (!productoResponse.ok) {
                throw new Error();
            }

            const producto = await productoResponse.json();
            res.status(201).json(producto);
        } catch (error) {
            next(new DogoError('Error al crear producto', 500));
        }
    }

    static async obtenerProductoPorId(req, res, next) {
        try {
            const id = req.params.id;
            const productoResponse = await fetch(`${API_URL}/productos/${id}`);

            if (!productoResponse.ok) {
                return next(new DogoError('Producto no encontrado', 404));
            }

            const producto = await productoResponse.json();
            res.status(200).json(producto);
        } catch (error) {
            next(new DogoError('Error al obtener el producto', 500));
        }
    }

    static async obtenerProductos(req, res, next) {
        try {
            const productosResponse = await fetch(`${API_URL}/productos`);
            const productos = await productosResponse.json();

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

            // Verifica si el producto existe
            const productoExistsResponse = await fetch(`${API_URL}/productos/${id}`);
            if (!productoExistsResponse.ok) {
                return next(new DogoError('Producto no encontrado', 404));
            }

            const productoData = req.body;
            const productoResponse = await fetch(`${API_URL}/productos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoData),
            });

            if (!productoResponse.ok) {
                throw new Error();
            }

            const producto = await productoResponse.json();
            res.status(200).json(producto);
        } catch (error) {
            next(new DogoError('Error al actualizar el producto', 500));
        }
    }

    static async eliminarProducto(req, res, next) {
        try {
            const id = req.params.id;

            // Verifica si el producto existe
            const productoExistsResponse = await fetch(`${API_URL}/productos/${id}`);
            if (!productoExistsResponse.ok) {
                return next(new DogoError('Producto no encontrado', 404));
            }

            // Elimina el producto
            const deleteResponse = await fetch(`${API_URL}/productos/${id}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error();
            }

            res.status(200).json({ mensaje: 'Producto Eliminado Correctamente' });
        } catch (error) {
            next(new DogoError('Error al eliminar el producto', 500));
        }
    }
}

module.exports = ProductoController;
