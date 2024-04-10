const express = require('express');
const router = express.Router();
const APIproductController = require('../controllers/APIproductController');
const APIuserController = require('../controllers/APIuserController');
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
router.get('/products', APIproductController.index);

/* GET ONE PRODUCT */
// Ruta hacía el detalle del producto
router.get('/products/:id', APIproductController.detail);

// Ruta hacía la primer imagen del producto
router.get('/products/:id/imagen', APIproductController.imagen);

// TODOS LOS USUARIOS
router.get('/users', APIuserController.usuarios);

// PERFIL DEL USUARIO 
router.get('/users/:id', APIuserController.getOneUser);

// Ruta hacía la imagen del usuario
router.get('/users/:id/imagen', APIuserController.imagen);


module.exports = router;