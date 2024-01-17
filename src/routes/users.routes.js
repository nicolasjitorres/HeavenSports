const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { body } = require('express-validator');


// Middlewares
const validations = require('../middlewares/validateRegisterMiddleware');
const upload = require('../middlewares/multerMiddleware');


// Ruta hacía el login
router.get('/login', userController.login);

// REGISTRAR UN USUARIO
router.get('/register', userController.register);
router.post('/', upload.single('Imagen'), validations, userController.save); 

// Perfil de un usuario
router.get('/profile/:userId', userController.profile);

/*** DELETE ONE User***/ 
router.delete('/:userId', userController.destroyUser); 

//Ruta lista de usuarios
router.get('/', userController.usuarios);

// Ruta info del usuario
router.get('/:id/detail', userController.detail);

//Ruta Editar usuario
router.get('/:id/edit', userController.edit);
router.put('/:id', userController.update);


module.exports = router;