const express = require('express');
const ordenDetalleController = require('../controllers/ordenDetalle');


const router = express.Router();

router.get('/ordenDetalle/:ordenId', ordenDetalleController.getDetalles);
router.post('/ordenDetalle', ordenDetalleController.createDetalle);
router.put('/ordenDetalle/:id', ordenDetalleController.updateDetalle);

module.exports = router;