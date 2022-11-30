import { OrderItem } from "./order-item";
import { OrderType } from "./order-type";
import { User } from "./user";

export class Order {
    constructor(public id: number, 
        public total: number, 
        public orderItems: OrderItem[], 
        public orderType: OrderType, 
        public status: string, 
        public user: User) {}
}
