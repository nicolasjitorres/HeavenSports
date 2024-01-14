const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');

const imgStorage = path.join(__dirname, '../../public/images/users');
var mDStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, imgStorage);
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


// Middlewares
const validations = require('../middlewares/validateRegisterMiddleware');
const upload = multer({ storage: mDStorage});

// Ruta hacía el login
router.get('/login', userController.login);

// REGISTRAR UN USUARIO
router.get('/register', userController.register);
router.post('/', upload.single('Imagen'), validations, userController.save); 

// Perfil de un usuario
router.get('/profile/:userId', userController.profile);

module.exports = router;