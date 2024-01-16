import fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CartEntity, CartItemEntity } from '../../schemas/cart.entity';

const cartFilePath = path.join(__dirname, '../../data/carts.json');

export class CartRepository {

  getAllCarts(): CartEntity[] {
    try {
      const carts = fs.readFileSync(cartFilePath, 'utf8');
      return JSON.parse(carts);
    } catch (error) {
      console.error('Error reading or parsing JSON:', error.message);
      return [];
    }
  }

  getCart(userId: string): CartEntity {
    const carts = this.getAllCarts();
    return carts.find((cart) => cart.userId === userId && !cart.isDeleted); 
  }

  createCart(userId: string): CartEntity {
      const carts = this.getAllCarts();
      const cart : CartEntity = {
        id: uuidv4(),
        userId: userId,
        isDeleted: false,
        items: []
      };

      carts.push(cart);
      fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2));  
      return cart;
  }

  removeCart(userId: string): CartEntity {
    const carts: CartEntity[] = this.getAllCarts();
    const cartIndex = carts.findIndex((cart) => cart.userId === userId && !cart.isDeleted);

    if (cartIndex !== -1) {
      carts[cartIndex].isDeleted = true;
      fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2), 'utf8');
    }
    return carts[cartIndex];
  }

  updateCartItems(userId: string, items: CartItemEntity[]): CartEntity{
    console.log(userId)
    const carts = this.getAllCarts();
    const cartIndex = carts.findIndex((cart) => cart.userId === userId && !cart.isDeleted);
    
    console.log(cartIndex);
    if (cartIndex === -1) {
      return null;
    }

    carts[cartIndex].items = items;
    
    fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2), 'utf8');
    return carts[cartIndex];
  }
}