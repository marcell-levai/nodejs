import { CartEntity, CartItemEntity, CartModel } from '../../schemas/cart.entity';

export class CartRepository {
  getCart(userId: string): Promise<CartEntity> {
    return CartModel.findOne({ userId, isDeleted: false }).exec();
  }

  createCart(userId: string): Promise<CartEntity> {
    const newCart = new CartModel({
      userId,
      isDeleted: false,
      items: [],
    });

    return newCart.save();
  }

  async removeCart(cart: CartEntity): Promise<CartEntity> {
    cart.isDeleted = true;
    return cart.save();
  }

  async updateCartItems(cart: CartEntity, items: CartItemEntity[]){
    cart.items = items;
    return cart.save();
  }
}
