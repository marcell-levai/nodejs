import { CartRepository } from "../../data/repositories/cart.repository";
import { OrderRepository } from "../../data/repositories/order.repository";
import { OrderEntity } from "../../schemas/order.entity";

export class OrderService {
    private orderRepository: OrderRepository;
    private cartRepository: CartRepository;

    constructor(){
        this.orderRepository = new OrderRepository();
        this.cartRepository = new CartRepository();
    }

    async createOrder(userId: string){
        const cart = await this.cartRepository.getCart(userId);

        if(!cart || cart.items.length < 0){
            throw { status: 400, message: 'Cart is empty' };
        }

        const order: OrderEntity = {
            userId: userId,
            cartId: cart._id,
            items: cart.items,
            payment: {
                type: '',
                address: null,
                creditCard: null,
            },
            delivery: {
                type: '',
                address: null,
            },
            comments: '',
            status: 'created',
            total: cart.items.reduce(
                (total, item) => total + item.product.price * item.count,
                0
            )
        };

        return this.orderRepository.saveOrder(order);
    }
}