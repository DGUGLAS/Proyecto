const express = require('express');
const estadoController = require('../controllers/estado');

const router = express.Router();

router.post('/estados', estadoController.createEstado);
router.put('/estados/:id', estadoController.updateEstado);


module.exports = router;