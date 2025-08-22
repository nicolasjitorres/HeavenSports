import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';


// Middlewares
import guestUserMiddleware from '../middlewares/guestUserMiddleware.js';
import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import adminMiddleware from "../middlewares/adminMiddleware.js";
import multerMiddleware from '../middlewares/multerMiddleware.js';
import validationRegisterMiddleware from '../middlewares/validations/users/validationRegisterMiddleware.js';
import validationEditMiddleware from '../middlewares/validations/users/validationEditMiddleware.js';
import validationChangePassMiddleware from '../middlewares/validations/users/validationChangePassMiddleware.js';
import validationLoginMiddleware from '../middlewares/validations/users/validationLoginMiddleware.js';
const upload = multerMiddleware('users');

// LOGIN
router.get('/login', guestUserMiddleware, userController.login);
router.post('/signIn', guestUserMiddleware, validationLoginMiddleware.validation, validationLoginMiddleware.result, userController.signIn);

// LOGOUT
router.get('/logout', authUserMiddleware, userController.logout);

// REGISTRO
router.get('/register', guestUserMiddleware, userController.register);
router.post('/register',guestUserMiddleware, upload.single('imagen'), validationRegisterMiddleware.validation, validationRegisterMiddleware.result , userController.save); 

// ELIMINACION DE UNA CUENTA (SOLO ADMINISTRADOR)
router.delete('/:id',adminMiddleware, userController.destroyUser); 

// TODOS LOS USUARIOS
router.get('/', adminMiddleware, userController.usuarios);

// PERFIL DEL USUARIO
router.get('/profile', authUserMiddleware, userController.profile);

// PERFIL DEL USUARIO (vista de administrador)
router.get('/userEdit/:id', adminMiddleware, userController.getAdminEditView);
router.patch('/changeCategory/:id', adminMiddleware, userController.changeCategory)

// EDICION DEL USUARIO
router.get('/edit', authUserMiddleware, userController.edit);
router.put('/edit', authUserMiddleware, upload.single('imagen'), validationEditMiddleware.validation, validationEditMiddleware.result, userController.update);

// CAMBIO DE CONTRASEÑA
router.get('/changePass', authUserMiddleware, userController.changePass);
router.put('/changePass', authUserMiddleware, validationChangePassMiddleware.validation, validationChangePassMiddleware.result, userController.updatePass);

// DARSE DE BAJA (SOLO USUARIOS)
router.delete('/softDelete/:id', authUserMiddleware, userController.softDelete);



export default router;