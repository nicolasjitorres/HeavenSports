const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { body } = require('express-validator');


// Middlewares
const validations = require('../middlewares/validateRegisterMiddleware');
const upload = require('../middlewares/multerMiddleware');


// LOGUEARSE
router.get('/login', userController.login);
router.post('/signIn', userController.signIn);

// REGISTRO
router.get('/register', userController.register);
router.post('/', upload.single('Imagen'), validations, userController.save); 

// ELIMINACION DE UNA CUENTA
router.delete('/:id', userController.destroyUser); 

// TODOS LOS USUARIOS
router.get('/', userController.usuarios);

// DETALLE DEL USUARIO
router.get('/:id/detail', userController.detail);

// EDICION DEL USUARIO
router.get('/:id/edit', userController.edit);
router.put('/:id', userController.update);


module.exports = router;