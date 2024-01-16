import { CartEntity, CartItemEntity, UpdateCartItemEntity, dataSchema } from '../../schemas/cart.entity';
import { CartRepository } from '../../data/repositories/cart.repository';
import { ProductRepository } from '../../data/repositories/product.repository';

export class CartService {
  private cartRepository: CartRepository;
  private productRepository: ProductRepository;

  constructor(){
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
  }

  getCartByUserId(userId: string): CartEntity {
    const cart = this.cartRepository.getCart(userId);
    
    if(cart){
      return cart;
    }else{
      return this.cartRepository.createCart(userId);
    }
  }

  updateCartItems(userId: string, items: UpdateCartItemEntity[]): CartEntity{
    const cart = this.cartRepository.getCart(userId);

    if (!cart) {
      throw { status: 404, message: 'Cart not found' };
    }
    
    if (!Array.isArray(items)) {
      items = [items];
    }

    let validatedItems : CartItemEntity[] = [];
    for (const item of items) {
      const { error } = dataSchema.validate(item);

      if (error) {
        throw { message: 'Products are not valid', status: 400 };
      } else {
        const { productId, count } = item;
        const product = this.productRepository.findProductById(productId);

        if (!product) {
          throw { message: 'Products are not valid', status: 400 };
        }

        const cartItem: CartItemEntity = {
          product: product,
          count: count,
        };
        validatedItems.push(cartItem);
      }
    }
    return this.cartRepository.updateCartItems(cart.userId, validatedItems);
  }


  removeCart(userId: string): boolean {
    const cart = this.cartRepository.getCart(userId); 

    if (!cart) {
      throw { status: 404, message: 'Cart was not found' };
    }

    const deletedCart = this.cartRepository.removeCart(userId);

    return deletedCart.isDeleted;
  }
}