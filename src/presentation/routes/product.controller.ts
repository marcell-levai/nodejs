import { authenticateUser } from '../../business/services/auth.service';
import { getAll, getById } from '../../business/services/product.service';
import express from 'express';

const router = express.Router();

router.get('/', authenticateUser, getAll);
router.get('/:productId', authenticateUser, getById);

export default router;