import express from 'express';
import { CartController } from '../presentation/controller/cart.controller';
import { AuthController } from '../presentation/controller/auth.controller';

const router = express.Router();
const cartController = new CartController();
const authController = new AuthController();

router.get('/', authController.authenticateUser, cartController.getCart);
router.put('/', authController.authenticateUser, cartController.updateCart);
router.delete('/', authController.authenticateUser, cartController.removeCart);
router.post('/checkout', authController.authenticateUser, cartController.checkout);

export default router;