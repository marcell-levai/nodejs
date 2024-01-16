import fs from 'fs';
import * as path from 'path';
import { ProductEntity } from 'schemas/product.entity';
const filePath = path.join(__dirname, '../../data/products.json');

export class ProductRepository {
  
  getAllProduct(): ProductEntity[] {
    try {
      const products = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(products);
    } catch (error) {
      console.error('Error reading or parsing JSON:', error.message);
      return [];
    }
  }

  findProductById(id: string): ProductEntity {
    const products = this.getAllProduct();
    return products.find((product) => product.id === id);
  }
}