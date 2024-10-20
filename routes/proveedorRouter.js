const express = require('express');
const router = express.Router();
const proveedorController = require('../controller/proveedorController');

router.get('/', proveedorController.obtenerProveedores);
router.get('/:id', proveedorController.obtenerProveedorPorId);
router.post('/', proveedorController.crearProveedor);
router.put('/:id', proveedorController.actualizarProveedor);
router.delete('/:id', proveedorController.eliminarProveedor);

module.exports = router;