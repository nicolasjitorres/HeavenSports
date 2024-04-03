const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Middlewares
const guestUserMiddleware = require('../middlewares/guestUserMiddleware');
const authUserMiddleware = require('../middlewares/authUserMiddleware');
const adminMiddleware = require("../middlewares/adminMiddleware");
const multerMiddleware = require('../middlewares/multerMiddleware');
const validationRegisterMiddleware = require('../middlewares/validations/users/validationRegisterMiddleware');
const validationEditMiddleware = require('../middlewares/validations/users/validationEditMiddleware');
const validationChangePassMiddleware = require('../middlewares/validations/users/validationChangePassMiddleware');
const validationLoginMiddleware = require('../middlewares/validations/users/validationLoginMiddleware');
const upload = multerMiddleware('users');

// LOGIN
router.get('/login', guestUserMiddleware, userController.login);
router.post('/signIn', guestUserMiddleware, validationLoginMiddleware.validation, validationLoginMiddleware.result, userController.signIn);

// LOGOUT
router.get('/logout', authUserMiddleware, userController.logout);

// REGISTRO
router.get('/register', guestUserMiddleware, userController.register);
router.post('/register', guestUserMiddleware, upload.single('imagen'), validationRegisterMiddleware.validation, validationRegisterMiddleware.result, userController.save);

// TODOS LOS USUARIOS
router.get('/', adminMiddleware, userController.usuarios);

// PERFIL DEL USUARIO
router.get('/profile', authUserMiddleware, userController.profile);

// CAMBIAR DE CATEGORIA Y ELIMINAR USUARIO (SOLO ADMINISTRADOR)
router.patch('/changeCategory/:id', adminMiddleware, userController.changeCategory);
router.delete('/:id', adminMiddleware, userController.destroyUser);

// EDICION DEL USUARIO
router.get('/edit', authUserMiddleware, userController.edit);
router.put('/edit', authUserMiddleware, upload.single('imagen'), validationEditMiddleware.validation, validationEditMiddleware.result, userController.update);

// CAMBIO DE CONTRASEÑA
router.get('/changePass', authUserMiddleware, userController.changePass);
router.put('/changePass', authUserMiddleware, validationChangePassMiddleware.validation, validationChangePassMiddleware.result, userController.updatePass);

// DARSE DE BAJA (USUARIOS Y ADMINS)
router.delete('/softDelete/:id/:active', authUserMiddleware, userController.softDelete);



module.exports = router;