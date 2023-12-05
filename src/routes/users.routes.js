const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta hacía el registro
router.get('/register', userController.register);

// Ruta hacía el login
router.get('/login', userController.login);

module.exports = router;