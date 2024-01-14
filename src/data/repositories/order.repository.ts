import OrderModel, { OrderEntity } from "../../schemas/order.entity";

export class OrderRepository {
    saveOrder(order: OrderEntity){
        return OrderModel.create(order);
    }
}