const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Ruta hacía el detalle del producto
router.get('/detail', productController.detail);

// Ruta hacía el carrito de compras
router.get('/cart', productController.cart);

// Ruta hacía el formulario de carga de producto
router.get('/formCarga', productController.formCarga);

module.exports = router;