const express  = require('express');
const rolController = require('../controllers/rol');

const router = express.Router();

router.post('/roles', rolController.createRol);
router.get('/roles', rolController.getRoles);
router.get('/roles/:id', rolController.getRolById);
router.put('/roles/:id', rolController.updateRol);

module.exports = router;
