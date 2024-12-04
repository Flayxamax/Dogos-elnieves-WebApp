const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

router.post('/iniciarsesion', usuarioController.login)

module.exports = router;