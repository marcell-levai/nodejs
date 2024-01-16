import express from 'express';
import { CartController } from '../presentation/controller/cart.controller';
import { AuthMiddleware } from 'middlewares/auth.middleware';

const router = express.Router();
const cartController = new CartController();
const authMiddleware = new AuthMiddleware();

router.get('/', cartController.getCart);
router.put('/', cartController.updateCart);
router.delete('/', authMiddleware.adminAccessControl, cartController.removeCart);
router.post('/checkout', cartController.checkout);

export default router;