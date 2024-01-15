import express from 'express';
import { ProductController } from '../presentation/controller/product.controller';
import { AuthController } from '../presentation/controller/auth.controller';

const router = express.Router();
const productController = new ProductController();
const authController = new AuthController();

router.get('/', authController.verifyToken, productController.getAllProduct);
router.get('/:productId', authController.verifyToken, productController.getProductById);

export default router;