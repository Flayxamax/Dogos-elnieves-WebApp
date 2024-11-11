const { DogoError } = require('../utils/DogoError');

const API_URL = 'http://localhost:3000'; // Cambia el puerto si tu API usa uno diferente

class CompraController {
    static async crearCompra(req, res, next) {
        try {
            const { fecha, totalCompra, idUsuario } = req.body;
            if (!fecha || !totalCompra || !idUsuario) {
                return next(new DogoError('Los campos fecha, totalCompra y idUsuario son requeridos', 400));
            }

            // Verifica la existencia del usuario en la API
            const usuarioResponse = await fetch(`${API_URL}/usuarios/${idUsuario}`);
            if (!usuarioResponse.ok) {
                return next(new DogoError('El usuario no existe', 404));
            }

            // Crea la nueva compra en la API
            const compraResponse = await fetch(`${API_URL}/compras`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fecha, totalCompra, idUsuario }),
            });

            if (!compraResponse.ok) {
                throw new Error();
            }

            const compra = await compraResponse.json();
            res.status(201).json(compra);
        } catch (error) {
            next(new DogoError('Error al crear la compra', 500));
        }
    }

    static async obtenerCompraPorId(req, res, next) {
        try {
            const id = req.params.id;
            const compraResponse = await fetch(`${API_URL}/compras/${id}`);

            if (!compraResponse.ok) {
                return next(new DogoError('Compra no encontrada', 404));
            }

            const compra = await compraResponse.json();
            res.status(200).json(compra);
        } catch (error) {
            next(new DogoError('Error al obtener la compra', 500));
        }
    }

    static async obtenerCompras(req, res, next) {
        try {
            const comprasResponse = await fetch(`${API_URL}/compras`);
            const compras = await comprasResponse.json();

            if (compras.length === 0) {
                return next(new DogoError('No hay compras registradas', 404));
            }
            res.status(200).json(compras);
        } catch (error) {
            next(new DogoError('Error al obtener las compras', 500));
        }
    }

    static async actualizarCompra(req, res, next) {
        try {
            const id = req.params.id;

            // Verifica si la compra existe
            const compraExistsResponse = await fetch(`${API_URL}/compras/${id}`);
            if (!compraExistsResponse.ok) {
                return next(new DogoError('Compra no encontrada', 404));
            }

            const { idUsuario } = req.body;
            if (idUsuario) {
                // Verifica la existencia del usuario
                const usuarioResponse = await fetch(`${API_URL}/usuarios/${idUsuario}`);
                if (!usuarioResponse.ok) {
                    return next(new DogoError('El usuario no existe', 404));
                }
            }

            const compraData = req.body;
            const updateResponse = await fetch(`${API_URL}/compras/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(compraData),
            });

            if (!updateResponse.ok) {
                throw new Error();
            }

            const compra = await updateResponse.json();
            res.status(200).json(compra);
        } catch (error) {
            next(new DogoError('Error al actualizar la compra', 500));
        }
    }

    static async eliminarCompra(req, res, next) {
        try {
            const id = req.params.id;

            // Verifica si la compra existe
            const compraExistsResponse = await fetch(`${API_URL}/compras/${id}`);
            if (!compraExistsResponse.ok) {
                return next(new DogoError('Compra no encontrada', 404));
            }

            const deleteResponse = await fetch(`${API_URL}/compras/${id}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error();
            }

            res.status(200).json({ message: 'Compra eliminada correctamente' });
        } catch (error) {
            next(new DogoError('Error al eliminar la compra', 500));
        }
    }
}

module.exports = CompraController;
