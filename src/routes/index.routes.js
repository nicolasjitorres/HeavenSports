const express = require('express');
const router = express.Router();
const routerIndex = require('./main.routes');
const routerProducts = require('./products.routes');
const routerUsers = require('./users.routes');


router.use('/products', routerProducts);
router.use('/users', routerUsers);
router.use('/', routerIndex);

module.exports = router;