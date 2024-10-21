const express = require('express');
const router = express.Router();
const detalleOrdenController = require('../controller/detalleOrdenController');

router.get('/', detalleOrdenController.obtenerDetallesOrden);
router.get('/:id', detalleOrdenController.obtenerDetalleOrdenPorId);
router.post('/', detalleOrdenController.crearDetalleOrden);
router.put('/:id', detalleOrdenController.actualizarDetalleOrden);
router.delete('/:id', detalleOrdenController.eliminarDetalleOrden);

module.exports = router;
