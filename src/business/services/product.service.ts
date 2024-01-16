import { ProductEntity } from '../../schemas/product.entity';
import { ProductRepository } from '../../data/repositories/product.repository';
import { RequestHandler } from 'express';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  getAllProduct(): ProductEntity[] {
    return this.productRepository.getAllProduct();
  }

  getProductById(id: string): ProductEntity  {
    const product = this.productRepository.findProductById(id);

    if (product) {
      return product;
    }else{
      throw { message: 'No product with such id', status: 404 };
    }
  }
}