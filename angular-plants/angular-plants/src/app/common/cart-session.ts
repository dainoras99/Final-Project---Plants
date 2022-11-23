import { CartItem } from "./cart-item";

export class CartSession {
    asObservable(): CartSession {
      throw new Error('Method not implemented.');
    }
    constructor(public id: number, 
                public total_price: number,
                public cartItems: CartItem[]) {}
}
