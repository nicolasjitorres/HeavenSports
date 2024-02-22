const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminMiddleware = require("../middlewares/adminMiddleware");
const multerMiddleware = require('../middlewares/multerMiddleware');
const upload = multerMiddleware('products');

/* GET ALL PRODUCTS */ 
/* Obtener todos los productos */ 
router.get('/', productController.index); 

/* GET ONE PRODUCT */ 
// Ruta hacía el detalle del producto
router.get('/detail/:id', productController.detail); 

// Ruta hacía el carrito de compras
router.get('/cart', productController.cart);

/* CREATE ONE PRODUCT */ 
router.get('/create', adminMiddleware, productController.create); 
router.post('/', upload.array('imagenes'), productController.save); 

/* EDIT ONE PRODUCT */ 
router.get('/edit/:id', adminMiddleware, productController.edit); 
router.put('/:id', productController.update); 

/* DELETE ONE PRODUCT */ 
router.delete('/:id', adminMiddleware, productController.logicDelete); 

/* GET ALL IMAGES AND SIZES BY ONE PRODUCT */
router.get('/edit/:id/relations', adminMiddleware, productController.relations)

module.exports = router;