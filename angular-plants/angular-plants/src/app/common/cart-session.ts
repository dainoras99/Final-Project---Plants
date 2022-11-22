import { CartItem } from "./cart-item";

export class CartSession {
    constructor(public id: number, 
                public total_price: number,
                public cartItems: CartItem[]) {}
}
