import express from 'express';
import { CartController } from '../presentation/controller/cart.controller';
import { AuthController } from '../presentation/controller/auth.controller';

const router = express.Router();
const cartController = new CartController();
const authController = new AuthController();

router.get('/', authController.verifyToken, cartController.getCart);
router.put('/', authController.verifyToken, cartController.updateCart);
router.delete('/', authController.verifyToken, cartController.removeCart);
router.post('/checkout', authController.verifyToken, cartController.checkout);

export default router;