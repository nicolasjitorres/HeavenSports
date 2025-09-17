import express from 'express';
const router = express.Router();
import authController from './auth-controller.js';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google', authController.loginWithGoogle);

export default router;