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


// export const getCart: RequestHandler = async (req, res) => {
//     const userId = req.header('x-user-id');
    
//     try{   
//       const cart = await findCart(userId);
//       return res.status(200).json({ data: { 
//         cart: cart,
//         total: cart.items.reduce(
//           (total, item) => total + item.product.price * item.count,
//           0
//         ),
//       } , error: null }); 
//     }catch(error){
//       console.error('Internal Server error:', error);
//       return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
//     }
// };

// export const updateCart: RequestHandler = async (req, res) => {
//   const userId = req.header('x-user-id');
//   const items: UpdateCartItemEntity[] = req.body;

//   try{
//     // const valid = validateCartItems(items);
//     // if(!valid){
//     //   return res.status(400).json({ data: null, error: { message: 'Porducts are not valid' } });
//     // }

//     const cart = await changeCart(userId, items);
//     if(!cart){
//       return res.status(404).json({ data: null, error: { message: 'Cart was not found' } });
//     }

//     return res.status(200).json({ data: { 
//       cart: cart,
//       total: cart.items.reduce(
//         (total, item) => total + item.product.price * item.count,
//         0
//       ),
//     } , error: null }); 
//   }catch(error){
//     console.error('Internal Server error:', error);
//     return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
//   }
// };

// export const deleteCart: RequestHandler = async (req, res) => {
//   const userId = req.header('x-user-id');
  
//   try{
//       const success = await removeCart(userId);
//       return res.status(200).json({ data: success , error: null }); 
//   }catch(error){
//     console.error('Internal Server error:', error);
//     return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
//   }
// };

// export const checkout: RequestHandler = async (req, res) => {
//   const userId = req.header('x-user-id');

//   try{
//       const order = createOrder(userId);

//       if(!order){
//         return res.status(200).json({ data: null , error: "Cart is empty" }); 
//       }else{
//         return res.status(200).json({ data: order , error: null }); 
//       }  
//   }catch(error){
//     console.error('Internal Server error:', error);
//     return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
//   }
// };