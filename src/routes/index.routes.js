const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


// Ruta hacía el detalle del producto
router.get('/', indexController.index);

// Ruta hacía el carrito de compras
router.get('/about', indexController.about);

module.exports = router;