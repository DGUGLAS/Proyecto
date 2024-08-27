const express = require('express');
const estadoController = require('../controllers/estado');

const router = express.Router();

router.post('/estados', estadoController.createEstado);
router.get('/estados', estadoController.getEstados);
router.get('/estados/:id', estadoController.getEstadoById);
router.put('/estados/:id', estadoController.updateEstado);


module.exports = router;