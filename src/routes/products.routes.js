const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/*** Obtener todos los productos ***/ 
router.get('/', productController.index); 

// Ruta hacía el detalle del producto
router.get('/detail/:id', productController.detail); 

// Ruta hacía el carrito de compras
router.get('/cart', productController.cart);

// Ruta hacía el formulario de carga de producto
router.get('/formCarga', productController.formCarga);

// Ruta hacía el formulario de edicion de producto
router.get('/formEdit', productController.formEdit);


module.exports = router;