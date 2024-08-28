const express = require('express');
const productoController = require('../controllers/Producto');

const router = express.Router();


// Definir rutas y asociarlas con el controlador
router.get('/producto', productoController.getProductos);
router.post('/producto', productoController.createProducto);
router.get('/productos/:id', productoController.getProductoById);
router.put('/productos/:id', productoController.updateProducto);

module.exports = router;