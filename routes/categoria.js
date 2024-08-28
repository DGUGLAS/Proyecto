const express = require('express');
const categoriaProductoController = require('../controllers/categoria');

const router = express.Router();

router.post('/categoria', categoriaProductoController.crearCategoria);
router.get('/categoria', categoriaProductoController.obtenerCategorias);
router.put('/categorias:id', categoriaProductoController.actualizarCategoria);

module.exports = router;