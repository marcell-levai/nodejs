import { CartItemEntity, CartItemSchema} from './cart.entity';
import mongoose, { Schema, Document } from 'mongoose';

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  userId: string;
  cartId: string;
  items: CartItemEntity[] // products from CartEntity
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: [CartItemSchema], required: true },
  payment: {
    type: { type: String, required: true },
    address: { type: Schema.Types.Mixed },
    creditCard: { type: Schema.Types.Mixed },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: Schema.Types.Mixed, required: true },
  },
  comments: { type: String },
  status: { type: String, required: true },
  total: { type: Number, required: true },
})


const OrderModel = mongoose.model<OrderEntity>('Order', OrderSchema);
export default OrderModel;
