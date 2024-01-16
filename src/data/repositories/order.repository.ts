import fs from 'fs';
import * as path from 'path';
import { OrderEntity } from "../../schemas/order.entity";

const orderFilePath = path.join(__dirname, '../../data/orders.json');

export class OrderRepository {
    getAllOrders(){
        try {
          const orders = fs.readFileSync(orderFilePath, 'utf8');
          return JSON.parse(orders);
        } catch (error) {
          console.error('Error reading or parsing JSON:', error.message);
          return [];
        }
    }

    saveOrder(order: OrderEntity){
        const orders = this.getAllOrders();

        orders.push(order);
        fs.writeFileSync(orderFilePath, JSON.stringify(orders, null, 2));
        return order;
    }
}