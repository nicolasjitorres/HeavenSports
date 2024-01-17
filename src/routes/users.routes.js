const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');
const multer = require('multer');

const imgStorage = path.join(__dirname, '../../public/images/users');
var mDStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, imgStorage);
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: mDStorage});

// Ruta hacía el login
router.get('/login', userController.login);
router.post('/signIn', userController.signIn);

// REGISTRAR UN USUARIO
router.get('/register', userController.register);
router.post('/', upload.single('Imagen'), userController.save); 

module.exports = router;