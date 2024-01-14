import ProductModel, { ProductEntity } from '../../schemas/product.entity';

export class ProductRepository {

  getAllProduct(): Promise<ProductEntity[]> {
      return ProductModel.find().exec();
  }

  findProductById(id: string): Promise<ProductEntity> {
    return ProductModel.findOne({ _id: id }).exec();
  }
}