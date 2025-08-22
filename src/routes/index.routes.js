import express from 'express';
const router = express.Router();
import routerIndex from './main.routes.js'
import routerProducts from './products.routes.js';
import routerUsers from './users.routes.js';


router.use('/products', routerProducts);
router.use('/users', routerUsers);
router.use('/', routerIndex);

export default router;