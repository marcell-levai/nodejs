import fs from 'fs';
import * as path from 'path';
import { ProductEntity } from 'schemas/product.entity';

const filePath = path.join(__dirname, '../../data/products.json');

function findAll(): ProductEntity[] {
  try {
    const products = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(products);
  } catch (error) {
    console.error('Error reading or parsing JSON:', error.message);
    return [];
  }
}

function findProductById(id: string): ProductEntity | undefined {
    const products = findAll();
    return products.find((product) => product.id === id);
}

export { findAll, findProductById };