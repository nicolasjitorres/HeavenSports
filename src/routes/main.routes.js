import express from 'express';
const router = express.Router();
import indexController from '../controllers/indexController.js';


// Ruta hacía la pagina principal
router.get('/', indexController.index);

// Ruta hacía el about
router.get('/about', indexController.about);

export default router;