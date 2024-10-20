const productoDAO = require('../dataAccess/ProductoDAO');
const insumoDAO = require('../dataAccess/InsumoDAO');

class ProductoController{

    static async crearProducto(req, res){
        try {
            const {nombre, precio, insumoId} = req.body;
            if(!nombre || !precio || !insumoId){
                //TO DO middleware errores
                return res.status(400).json({ message: 'Los campos nombre, precio e insumoId son requeridos' });
            }
            const insumo = await insumoDAO.findById(insumoId);
            if(!insumo){
                return res.status(404).json({message: 'El insumo no existe'});
            }
            const newProducto = {nombre, precio, insumoId}
            const producto = await productoDAO.create(newProducto);
            res.status(201).json(producto);
        } catch (error) {
            //TO DO middleware errores
            res.status(500).json({ error: 'Error al crear producto' });
        }
    }

    static async obtenerProductoPorId(req, res) {
        try {
            const id = req.params.id;
            const producto = await productoDAO.findById(id);

            if (!producto) {
                //TO DO middleware errores
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.status(200).json(producto);
        } catch (error) {
            //TO DO middleware errores
            res.status(500).json({ error: 'Error al obtener el producto' });
        }
    }

    static async obtenerProductos(req, res) {
        try {
            const productos = await productoDAO.findAll();

            if (productos.length === 0) {
                return res.status(404).json({ message: 'No hay productos registrados' });
            }

            res.status(200).json(productos);
        } catch (error) {
            //TO DO middleware errores
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
    }


    static async actualizarProducto(req, res) {
        try {
            const id = req.params.id;

            const productoexists = await productoDAO.findById(id);

            if (!productoexists) {
                //TO DO middleware errores
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            const productoData = req.body;

            const producto = await productoDAO.update(id, productoData)

            if (!producto) {
               //TO DO middleware errores
               return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.status(200).json(producto);
        } catch (error) {
           //TO DO middleware errores
           res.status(500).json({ error: 'Error al actualizar el productos' });
        }
    }

    static async eliminarProducto(req, res) {
        try {
            const id = req.params.id;
            const productoexists = await productoDAO.findById(id);

            if (!productoexists) {
               //TO DO middleware errores
               return res.status(404).json({ message: 'Producto no encontrado' });
            }

            const producto = await productoDAO.delete(id);
            const msjReturn = { mensaje: 'Producto Eliminado Correctamente' };

            res.status(200).json(msjReturn)
        } catch (error) {
            //TO DO middleware errores
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }

}

module.exports = ProductoController;