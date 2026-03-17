import express from 'express';
import userController from './controllers/user.controller.js';
import { protect } from '../../common/middleware/auth.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh', userController.refresh);
router.get('/me', protect, userController.getMe);

export default router;