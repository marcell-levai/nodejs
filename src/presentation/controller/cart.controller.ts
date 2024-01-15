import { CartService } from "../../business/services/cart.service";
import { OrderService } from "../../business/services/order.service";
import { RequestHandler } from "express";
import { UpdateCartItemEntity } from "schemas/cart.entity";

export class CartController {
    private cartService: CartService;
    private orderService: OrderService;

    constructor(){
        this.cartService = new CartService();
        this.orderService = new OrderService();
    }

    getCart: RequestHandler = async (req, res) => {
        try{
            const userId = req.header("x-user-id");
            const cart = await this.cartService.getCartByUserId(userId);

            return res.status(200).json({ data: { 
                    cart: cart,
                    total: cart.items.reduce(
                    (total, item) => total + item.product.price * item.count,
                    0)
                }, error: null });
        }catch(error){
            return res.status(error.status || 500).json({ data: null, error: { message: error.message || 'Internal Server Error' }});
        }
    }

    updateCart: RequestHandler = async (req, res) => {
        try{
            const userId = req.header('x-user-id');
            const items: UpdateCartItemEntity[] = req.body;
            const cart = await this.cartService.updateCartItems(userId, items);
            return res.status(200).json({ data: { 
                cart: cart,
                total: cart.items.reduce(
                (total, item) => total + item.product.price * item.count,
                0)
            }, error: null });
        }catch(error){
            return res.status(error.status || 500).json({ data: null, error: { message: error.message || 'Internal Server Error' }});
        }
    }

    removeCart: RequestHandler = async (req, res) => {
        try{
            const userId = req.header('x-user-id');
            const success = this.cartService.removeCart(userId);
            return res.status(200).json({ data: success, error: null });
        }catch(error){
            return res.status(error.status || 500).json({ data: null, error: { message: error.message || 'Internal Server Error' }});
        }
    }

    checkout: RequestHandler = async (req, res) => {
        try{
            const userId = req.header('x-user-id');
            const order = await  this.orderService.createOrder(userId);
            return res.status(200).json({ data: order, error: null });
        }catch(error){
            return res.status(error.status || 500).json({ data: null, error: { message: error.message || 'Internal Server Error' }});
        }
    }
}