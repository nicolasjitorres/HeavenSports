const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/*** GET ALL PRODUCTS ***/ 
/*** Obtener todos los productos ***/ 
router.get('/', productController.index); 

/*** GET ONE PRODUCT ***/ 
// Ruta hacía el detalle del producto
router.get('/detail/:id', productController.detail); 

// Ruta hacía el carrito de compras
router.get('/cart', productController.cart);


module.exports = router;