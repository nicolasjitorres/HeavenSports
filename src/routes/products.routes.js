const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


/*** GET ALL PRODUCTS ***/ 
router.get('/', ... );

/*** GET ONE PRODUCT ***/ 
// Ruta hacía el detalle del producto
router.get('/detail:id', ... );

/*** CREATE ONE PRODUCT ***/ 
// Ruta hacía el formulario de carga de producto
router.get('/formCarga', ... );
router.post('/', upload.array(' ... '), ... ); 

/*** EDIT ONE PRODUCT ***/ 
// Ruta hacía el formulario de edicion de producto
router.get('/formEdit/:id', ... );
router.put('/:id', ... ); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', ... ); 

//////////////////////////////////////////////

// Ruta hacía el carrito de compras
router.get('/cart', productController.cart);


module.exports = router;