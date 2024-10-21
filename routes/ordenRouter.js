const express = require('express');
const router = express.Router();
const ordenController = require('../controller/ordenController');

router.get('/', ordenController.obtenerOrdenes);
router.get('/:id', ordenController.obtenerOrdenPorId);
router.post('/', ordenController.crearOrden);
router.put('/:id', ordenController.actualizarOrden);
router.delete('/:id', ordenController.eliminarOrden);

module.exports = router;
