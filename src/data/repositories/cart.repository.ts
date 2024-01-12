import fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CartEntity, CartItemEntity, UpdateCartItemEntity } from '../../schemas/cart.entity';
import { findProductById } from './product.repository';
import { OrderEntity } from 'schemas/order.entity';
import Joi from 'joi';

const cartFilePath = path.join(__dirname, '../../data/carts.json');
const orderFilePath = path.join(__dirname, '../../data/orders.json');

function getAllCarts(): CartEntity[] {
    try {
      const carts = fs.readFileSync(cartFilePath, 'utf8');
      return JSON.parse(carts);
    } catch (error) {
      console.error('Error reading or parsing JSON:', error.message);
      return [];
    }
}

function findCart(userId: string) {
    const carts = getAllCarts();
    let cart: CartEntity = carts.find((cart) => cart.userId === userId && !cart.isDeleted);
    
    if(!cart){
        cart = {
          id: uuidv4(),
          userId: userId,
          isDeleted: false,
          items: []
        };
        carts.push(cart);
        fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2));  
    }

    return generateResponse(cart);
}

function changeCart(userId: string, items: UpdateCartItemEntity[]) {
  const carts = getAllCarts();
  const cartIndex = carts.findIndex((cart) => cart.userId === userId && !cart.isDeleted);

  if (cartIndex === -1) {
    return null;
  }

  const products = Array.isArray(items)
  ? items.map(({ productId, count }) => {
    const product = findProductById(productId);
    return { product: product, count: count };
  })
  : [items].map(({ productId, count }) => {
    const product = findProductById(productId);
    return { product: product, count: count };
  });
  
  carts[cartIndex].items = products;
  fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2), 'utf8');

  return generateResponse(carts[cartIndex]);
}

function removeCart(userId: string): boolean {
  const carts: CartEntity[] = getAllCarts();
  const cartIndex = carts.findIndex((cart) => cart.userId === userId && !cart.isDeleted);

  if (cartIndex !== -1) {
    carts[cartIndex].isDeleted = true;
    fs.writeFileSync(cartFilePath, JSON.stringify(carts, null, 2), 'utf8');
    return true;
  }

  return false;
}

function createOrder(userId: string): OrderEntity{
  const carts = getAllCarts();
  let cart = carts.find((cart) => cart.userId === userId && !cart.isDeleted);

  if(!cart || cart.items.length < 1){
    return null;
  }

  const order: OrderEntity = {
    id: uuidv4(),
    userId: userId,
    cartId: cart.id,
    items: getCartItems(cart),
    payment: {
      type: '',
      address: null,
      creditCard: null,
    },
    delivery: {
      type: '',
      address: null,
    },
    comments: '',
    status: 'created',
    total: getTotalPrice(cart),
  };

  const orders = getAllOrders();
  orders.push(order);
  fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2));
  removeCart(userId);

  return order;
}

function getAllOrders(){
  try {
    const orders = fs.readFileSync(orderFilePath, 'utf8');
    return JSON.parse(orders);
  } catch (error) {
    console.error('Error reading or parsing JSON:', error.message);
    return [];
  }
}

function validateCartItems(items: UpdateCartItemEntity[]): boolean{   
  const itemsArray = Array.isArray(items) ? items : [items];
  const cartItemSchema = Joi.object({
      productId: Joi.string().uuid().required(),
      count: Joi.number().integer().min(0).required(),
    });

    const { error } = Joi.array().items(cartItemSchema).validate(itemsArray);
    return !error;
}

function generateResponse(cart: CartEntity){
    const cartItems = getCartItems(cart);
    const cartResponse = { id: cart.id, items: cartItems };
    const total = getTotalPrice(cart);

    return { cart: cartResponse, total };
}

function getCartItems(cart: CartEntity){
  return Array.isArray(cart.items)
  ? cart.items.map((cartItem: CartItemEntity) => {
    return { product: cartItem.product, count: cartItem.count };
  })
  : [cart.items].map((cartItem: CartItemEntity) => {
    return { product: cartItem.product, count: cartItem.count };
  });
}

function getTotalPrice(cart: CartEntity): number{
  let total = 0;
  
  total = cart.items.reduce((sum, { product, count }) => {  
    return sum + (product ? product.price * count : 0);
  }, 0);

  return total;
}

export { findCart, changeCart, removeCart, createOrder, validateCartItems };

