import { OrderItem } from "./order-item";

export class Order {
    constructor(public id: number, public total: number, public orderItems: OrderItem[]) {}
}
