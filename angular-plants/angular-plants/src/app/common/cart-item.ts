import { Plant } from "./plant";

export class CartItem {
    constructor(public id: number, public quantity: number, public plant: Plant) {}
}
