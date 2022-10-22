import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userId!: Number;
  private baseUrl=`http://localhost:8080/api/users/${this.userId}/cartItems`;

  constructor() { }
}


interface GetResponseProduct {
  _embedded: {
    cartItems: [
      {
        "plant": 
      }      
    ]
  }
}