const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');
const adminMiddleware = require("../middlewares/adminMiddleware");

const imgStorage = path.join(__dirname, '../../public/images/products');
var mDStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, imgStorage);
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: mDStorage});

/*** GET ALL PRODUCTS ***/ 
/*** Obtener todos los productos ***/ 
router.get('/', productController.index); 

/*** GET ONE PRODUCT ***/ 
// Ruta hacía el detalle del producto
router.get('/:id/detail', productController.detail); 

// Ruta hacía el carrito de compras
router.get('/cart', productController.cart);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', adminMiddleware, productController.create); 
router.post('/', upload.array('Imagen'), productController.save); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', adminMiddleware, productController.edit); 
router.put('/:id', upload.array('Imagen'), productController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', adminMiddleware, productController.destroy); 

module.exports = router;