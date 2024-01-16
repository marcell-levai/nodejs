import express from 'express';
import { CartController } from '../presentation/controllers/cart.controller';

const router = express.Router();
const cartController = new CartController();

router.get('/', cartController.getCart);
router.put('/', cartController.updateCart);
router.delete('/', cartController.removeCart);
router.post('/checkout', cartController.checkout);

export default router;