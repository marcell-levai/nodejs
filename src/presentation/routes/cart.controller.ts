import express from 'express';
import { checkout, deleteCart, getCart, updateCart } from '../../business/services/cart.service';
import { authenticateUser } from '../../business/services/auth.service';

const router = express.Router();

router.get('/', authenticateUser, getCart);
router.put('/', authenticateUser, updateCart);
router.delete('/', authenticateUser, deleteCart);
router.post('/checkout', authenticateUser, checkout);

export default router;