import { OrderItem } from "./order-item";
import { OrderType } from "./order-type";

export class Order {
    constructor(public id: number, public total: number, public orderItems: OrderItem[], public orderType: OrderType) {}
}
