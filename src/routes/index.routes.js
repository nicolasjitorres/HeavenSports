const express = require('express');
const router = express.Router();
const routerProducts = require('./products.routes');
const routerUsers = require('./users.routes');
const path = require('path');

// Ruta hacía index
router.get('/', (req, res) => {
  res.render('index', {});
});
router.use('/products', routerProducts);
router.use('/users', routerUsers);

module.exports = router;