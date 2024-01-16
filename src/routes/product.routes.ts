import express from 'express';
import { ProductController } from '../presentation/controller/product.controller';

const router = express.Router();
const productController = new ProductController();

router.get('/', productController.getAllProduct);
router.get('/:productId', productController.getProductById);

export default router;