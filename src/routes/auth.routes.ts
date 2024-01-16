import express from 'express';
import { AuthController } from '../presentation/controllers/auth.controller';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

export default router;