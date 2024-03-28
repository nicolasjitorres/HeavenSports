const express = require('express');
const router = express.Router();
const APIproductController = require('../controllers/APIproductController');
const productController = require('../controllers/productController');
const adminMiddleware = require("../middlewares/adminMiddleware");
const authUserMiddleware = require("../middlewares/authUserMiddleware");
const multerMiddleware = require('../middlewares/multerMiddleware');
const validationCreateMiddleware = require('../middlewares/validations/products/validationCreateMiddleware');
const validationProductEditMiddleware = require('../middlewares/validations/products/validationProductEditMiddleware');
const validationAddSizeMiddleware = require('../middlewares/validations/products/validationAddSizeMiddleware');
const validationEditSizeMiddleware = require('../middlewares/validations/products/validationEditSizeMiddleware');
const upload = multerMiddleware('products');

/* GET ALL PRODUCTS */
/* Obtener todos los productos */
router.get('/products/', APIproductController.index);

/* GET ONE PRODUCT */
// Ruta hacía el detalle del producto
router.get('/products/:id', APIproductController.detail);

// Ruta hacia el carrito de compras del usuario
router.get('/products/cart', APIproductController.cart);
// router.get('/cart', authUserMiddleware, productController.cart);

// Agrega un producto al carrito
router.post('/cart/:id', productController.addCart);

/* CREATE ONE PRODUCT */
router.get('/create', productController.create);
router.post('/create', upload.array('imagenes'), validationCreateMiddleware.validation, validationCreateMiddleware.result, productController.save);


/* EDIT ONE PRODUCT */
router.get('/edit/:id', productController.edit);
// router.get('/edit/:id', adminMiddleware, productController.edit);
router.put('/:id', productController.update);
//router.put('/:id', adminMiddleware, validationProductEditMiddleware.validation, validationProductEditMiddleware.result, productController.update);


/* DELETE ONE PRODUCT */
router.delete('/:id', productController.logicDelete);
// router.delete('/:id', adminMiddleware, productController.logicDelete);

/* GET ALL IMAGES AND SIZES BY ONE PRODUCT */
router.get('/edit/:id/relations', productController.relations)
//router.get('/edit/:id/relations', adminMiddleware, productController.relations)

/* GET VIEW FOR ADD IMAGES TO ONE PRODUCT */
router.get('/edit/:id/relations/images/create', productController.getAddImage);
//router.get('/edit/:id/relations/images/create', adminMiddleware, productController.getAddImage);

/* ADD IMAGES TO ONE PRODUCT */
router.post('/edit/:id/relations/images', upload.array('imagenes'), productController.addImage);
//router.post('/edit/:id/relations/images', adminMiddleware, upload.array('imagenes'), productController.addImage);

/* DELETE ONE IMAGE OF ONE PRODUCT */
router.delete('/edit/:id/relations/images/:idImagen', productController.deleteImage);
//router.delete('/edit/:id/relations/images/:idImagen', adminMiddleware, productController.deleteImage);

/* GET VIEW FOR ADD ONE SIZE TO ONE PRODUCT */
router.get('/edit/:id/relations/sizes/create', productController.getAddSize);
//router.get('/edit/:id/relations/sizes/create', adminMiddleware, productController.getAddSize);

/* ADD SIZE TO ONE PRODUCT */
router.post('/edit/:id/relations/sizes', validationAddSizeMiddleware.validation, validationAddSizeMiddleware.result, productController.addSize);
//router.post('/edit/:id/relations/sizes', adminMiddleware, validationAddSizeMiddleware.validation, validationAddSizeMiddleware.result, productController.addSize);

/* EDIT ONE SIZE OF ONE PRODUCT */
router.get('/edit/:id/relations/sizes/:idTalle', productController.getEditSize);
//router.get('/edit/:id/relations/sizes/:idTalle', adminMiddleware, productController.getEditSize);

/* EDIT ONE SIZE OF ONE PRODUCT */
router.put('/edit/:id/relations/sizes/:idTalle', validationEditSizeMiddleware.validation, validationEditSizeMiddleware.result, productController.editSize);
//router.put('/edit/:id/relations/sizes/:idTalle', adminMiddleware, validationEditSizeMiddleware.validation, validationEditSizeMiddleware.result, productController.editSize);

/* DELETE ONE SIZE OF ONE PRODUCT */
router.delete('/edit/:id/relations/sizes/:idTalle', productController.deleteSize);
//router.delete('/edit/:id/relations/sizes/:idTalle', adminMiddleware, productController.deleteSize);



module.exports = router;