import { Plant } from "./plant";

export class OrderItem {
    constructor(public id: number, public quantity: number, public plant: Plant) {}
}
