import express from 'express';
import { ProductController } from '../presentation/controller/product.controller';
import { authenticateUser } from '../business/services/auth.service';
import { AuthController } from '../presentation/controller/auth.controller';

const router = express.Router();
const productController = new ProductController();
const authController = new AuthController();

router.get('/', authController.authenticateUser, productController.getAllProduct);
router.get('/:productId', authController.authenticateUser, productController.getProductById);

export default router;