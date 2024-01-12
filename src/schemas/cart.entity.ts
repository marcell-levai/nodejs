import { ProductEntity, product as bookProduct } from './product.entity'

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
