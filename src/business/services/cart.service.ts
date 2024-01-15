import { CartEntity, CartItemEntity, UpdateCartItemEntity } from '../../schemas/cart.entity';
import { CartRepository} from '../../data/repositories/cart.repository';
import { ProductRepository } from '../../data/repositories/product.repository';

export class CartService {
  private cartRepository: CartRepository;
  private productRepository: ProductRepository;

  constructor(){
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
  }

  async getCartByUserId(userId: string): Promise<CartEntity> {
    const cart = await this.cartRepository.getCart(userId);
    
    if(cart){
      if (cart.items.length > 0) {
        cart.populate("items.product");
      }
      return cart;
    }else{
      return this.cartRepository.createCart(userId);
    }
  }

  async updateCartItems(userId: string, items: UpdateCartItemEntity[]): Promise<CartEntity>{
    const cart = await this.cartRepository.getCart(userId);

    if (!cart) {
      throw { status: 404, message: 'Cart not found' };
    }
    
    if (!Array.isArray(items)) {
      items = [items];
    }

    let validatedItems : CartItemEntity[] = [];
    for (const item of items) {
      const { productId, count } = item;
      const product = await this.productRepository.findProductById(productId);
      if (!product) {
        throw { message: 'Products are not valid', status: 400 };
      }

      const cartItem: CartItemEntity = {
        product: product,
        count: count,
      };
      validatedItems.push(cartItem);
    }

    return this.cartRepository.updateCartItems(cart, validatedItems);
  }


  async removeCart(userId: string): Promise<boolean> {
    const cart = await this.cartRepository.getCart(userId);

    if (!cart) {
      throw { status: 404, message: 'Cart was not found' };
    }
    const deletedCart = await this.cartRepository.removeCart(cart);
    return deletedCart.isDeleted;
  }
}