const express = require('express');
const router = express.Router();
const routerIndex = require('./main.routes');
const routerProducts = require('./products.routes');
const routerUsers = require('./users.routes');
const routerAPI = require('./API.routes');


router.use('/API', routerAPI);
router.use('/products', routerProducts);
router.use('/users', routerUsers);
router.use('/', routerIndex);

module.exports = router;