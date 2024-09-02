const express = require('express');
const usuarioController = require('../controllers/usuario');
const authenticateAndAuthorize = require('../middlewares/authrol');


const router = express.Router();

router.post('/usuarios',authenticateAndAuthorize(1), usuarioController.createUsuario);
router.put('/usuarios/:id', usuarioController.updateUsuario);


module.exports = router;