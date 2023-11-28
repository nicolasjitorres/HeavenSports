const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Ruta hacía el detalle del producto
router.get('/detail', productController.detail);

// Ruta hacía el carrito de compras
router.get('/cart', productController.cart);

module.exports = router;