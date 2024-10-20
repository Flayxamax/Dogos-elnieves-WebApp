const express = require('express');
const router = express.Router();
const insumoController = require('../controller/insumoController');

router.get('/', insumoController.obtenerInsumos);
router.get('/:id', insumoController.obtenerInsumoPorId);
router.post('/', insumoController.crearInsumo);
router.put('/:id', insumoController.actualizarInsumo);
router.delete('/:id', insumoController.eliminarInsumo);

module.exports = router;