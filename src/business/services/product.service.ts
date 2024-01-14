import { ProductEntity } from '../../schemas/product.entity';
import { ProductRepository } from '../../data/repositories/product.repository';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProduct(): Promise<ProductEntity[]> {
    return await this.productRepository.getAllProduct();
  }

  async getProductById(id: string): Promise<ProductEntity>  {
    const product = await this.productRepository.findProductById(id);

    if (product) {
      return product;
    }else{
      throw { message: 'No product with such id', status: 404 };
    }
  }
}