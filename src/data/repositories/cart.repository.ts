import { CartEntity, CartItemEntity, CartModel } from '../../schemas/cart.entity';

export class CartRepository {
  getCart(userId: string): Promise<CartEntity> {
    return CartModel.findOne({ userId, isDeleted: false }).exec();
  }

  createCart(userId: string): Promise<CartEntity> {
    const newCart: CartEntity = new CartModel({
      userId,
      isDeleted: false,
      items: [],
    });

    return CartModel.create(newCart);
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


// async function findCart(userId: string): Promise<CartEntity> {
//   try{
//     const userCart = await CartModel.findOne({ userId: userId, isDeleted: false }).exec();

//     if (!userCart) {
//       const newCart: CartEntity = new CartModel({
//         userId,
//         isDeleted: false,
//         items: [],
//       });
//       const createdCart = await CartModel.create(newCart);
//       return createdCart;
//     }
//     if (userCart.items.length > 0) {
//       userCart.populate("items.product");
//     }

//     return userCart;
//   } catch (error) {
//     console.error('Error finding cart:', error);
//     throw error;
//   }
// }

// async function changeCart(userId: string, items: UpdateCartItemEntity[]): Promise<CartEntity> {
//   try {
//     const userCart = await CartModel.findOne({ userId, isDeleted: false }).exec();
//     if (!userCart) {
//       throw new Error('User cart not found');
//     }

//     // userCart.items = [];
//     // if (!Array.isArray(items)) {
//     //   items = [items];
//     // }
//     // for (const item of items) {
//     //   const { productId, count } = item;
//     //   const product = null;//await findProductById(productId);
//     //   if (!product) {
//     //     throw new Error(`Product with ID ${productId} not found`);
//     //   }

//     //   const cartItem: CartItemEntity = {
//     //     product: product,
//     //     count: count,
//     //   };
//     //   userCart.items.push(cartItem);
//     // }

//     await CartModel.findByIdAndUpdate(userCart._id, userCart, { new: true }).exec();
//     return await CartModel.findById(userCart._id).populate("items.product");
//   } catch (error) {
//     console.error('Error updating cart items:', error);
//     throw error;
//   }
// }

// async function removeCart(userId: string): Promise<boolean> {
//   try {
//     const userCart = await CartModel.findOne({ userId, isDeleted: { $ne: true } }).exec();
//     if (!userCart) {
//       throw new Error('User cart not found');
//     }

//     userCart.isDeleted = true;
//     await userCart.save();
//     return false;
//   } catch (error) {
//     console.error('Error removing cart:', error);
//     throw error;
//   }
// }

// async function createOrder(userId: string): Promise<OrderEntity>{
//   const cart = await CartModel.findById(userId).populate("items.product");

//   const order: OrderEntity = {
//     userId: userId,
//     cartId: cart._id,
//     items: cart.items,
//     payment: {
//       type: '',
//       address: null,
//       creditCard: null,
//     },
//     delivery: {
//       type: '',
//       address: null,
//     },
//     comments: '',
//     status: 'created',
//     total: cart.items.reduce(
//       (total, item) => total + item.product.price * item.count,
//       0
//     )
//   };

//   const createdOrder = await OrderModel.create(order);
//   removeCart(userId);

//   return createdOrder;
// }

// function validateCartItems(items: UpdateCartItemEntity[]): boolean{   
//   const itemsArray = Array.isArray(items) ? items : [items];
//   const cartItemSchema = Joi.object({
//       productId: Joi.string().uuid().required(),
//       count: Joi.number().integer().min(0).required(),
//     });

//     const { error } = Joi.array().items(cartItemSchema).validate(itemsArray);
//     return !error;
// }

//export { findCart, changeCart, removeCart, createOrder, validateCartItems };

