import { CartItemEntity} from './cart.entity';

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  id: string, // uuid
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
