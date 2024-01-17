import { ProductEntity } from './product.entity';
import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity extends Document {
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface UpdateCartItemEntity {
  productId: string;
  count: number;
}

export const CartItemSchema: Schema = new Schema({
  product: {
    type:  Schema.Types.Mixed,
    ref: 'Product',
    required: true,
  },
  count: { type: Number, required: true },
},
{ versionKey: false, _id: false }
);

const CartSchema: Schema = new Schema({
  _id: { type: String, default: uuidv4, alias: 'id' },
  userId: { type: Schema.Types.String, ref: "User", required: true },
  isDeleted: { type: Boolean, required: true },
  items: [CartItemSchema],
},
{ versionKey: false }
);

const CartModel = mongoose.model<CartEntity>('Cart', CartSchema);
export { CartModel };
