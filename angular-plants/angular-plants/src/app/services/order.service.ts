import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private shopsUrl = "http://localhost:8080/api/v1/takefromshop";

  constructor(private httpClient: HttpClient) { }

  postCartItem(username: string, cartItems: CartItem[], total: number, OrderTypeId: number) : Observable<any> {
    return this.httpClient.post(`${this.shopsUrl}?id=${OrderTypeId}`, {username, cartItems, total}, {responseType: 'text'});
  }
}
