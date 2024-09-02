const express = require('express');
const ordenController = require('../controllers/orden');

const router = express.Router();

router.get('/orden', ordenController.getOrders);
router.post('/orden', ordenController.createOrder);
router.put('/orden/:id', ordenController.updateOrder);

module.exports = router;