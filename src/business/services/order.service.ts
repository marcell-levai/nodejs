import { CartRepository } from "../../data/repositories/cart.repository";
import { OrderRepository } from "../../data/repositories/order.repository";
import { OrderEntity } from "../../schemas/order.entity";
import { v4 as uuidv4 } from 'uuid';

export class OrderService {
    private orderRepository: OrderRepository;
    private cartRepository: CartRepository;

    constructor(){
        this.orderRepository = new OrderRepository();
        this.cartRepository = new CartRepository();
    }

    createOrder(userId: string){
        const cart = this.cartRepository.getCart(userId);
        
        if(!cart && cart.items.length < 1){
            throw { status: 400, message: 'Cart is empty' };
        }

        const order: OrderEntity = {
            id: uuidv4(),
            userId: userId,
            cartId: cart.id,
            items: cart.items,
            payment: {
                type: 'paypal',
                address: 'London',
                creditCard: '1234-1234-1234-1234',
            },
            delivery: {
                type: 'post',
                address: 'London',
            },
            comments: '',
            status: 'created',
            total: cart.items.reduce(
                (total, item) => total + item.product.price * item.count,
                0
            )
        };
        this.cartRepository.removeCart(userId);

        return this.orderRepository.saveOrder(order);
    }
}