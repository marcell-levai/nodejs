import { ProductEntity, product as bookProduct } from './product.entity';
const Joi = require('joi');

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface UpdateCartItemEntity {
  productId: string;
  count: number;
}

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export const dataSchema = Joi.object({
  productId: Joi.string().guid({ version: 'uuidv4' }).required(),
  count: Joi.number().integer().min(0).required()
});
