const express = require('express');
const ordenDetalleController = require('../controllers/ordenDetalle');


const router = express.Router();

// Obtener detalles de una orden
router.get('/ordenDetalle/:ordenId', ordenDetalleController.getDetalles);

// Crear un nuevo detalle de orden
router.post('/ordenDetalle', ordenDetalleController.createDetalle);

// Actualizar un detalle de orden existente
router.put('/ordenDetalle/:id', ordenDetalleController.updateDetalle);

module.exports = router;