const express = require('express');
const router = express.Router();
const compraController = require('../controller/compraController');

router.get('/', compraController.obtenerCompras);
router.get('/:id', compraController.obtenerCompraPorId);
router.post('/', compraController.crearCompra);
router.put('/:id', compraController.actualizarCompra);
router.delete('/:id', compraController.eliminarCompra);

module.exports = router;
