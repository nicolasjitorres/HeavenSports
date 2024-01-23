const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


// Ruta hacía la pagina principal
router.get('/', indexController.index);

// Ruta hacía el about
router.get('/about', indexController.about);

module.exports = router;