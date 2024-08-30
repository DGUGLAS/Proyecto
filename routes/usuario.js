const express = require('express');
const usuarioController = require('../controllers/usuario');

const router = express.Router();

router.post('/usuarios', usuarioController.createUsuario);
router.get('/usuarios', usuarioController.getAllUsuarios);
router.put('/usuarios/:id', usuarioController.updateUsuario);


module.exports = router;