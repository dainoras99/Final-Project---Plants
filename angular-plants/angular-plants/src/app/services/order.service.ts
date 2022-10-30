import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CartItem } from '../common/cart-item';
import { Delivery } from '../common/delivery';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private shopsUrl = "http://localhost:8080/api/v1/takefromshop";
  private parcelsUrl = "http://localhost:8080/api/v1/takefromparcel";
  private deliveryUrl = "http://localhost:8080/api/v1/takefromdelivery";  

  constructor(private httpClient: HttpClient) { }

  postCartItemShop(username: string, cartItems: CartItem[], total: number, OrderTypeId: number) : Observable<any> {
    return this.httpClient.post(`${this.shopsUrl}?id=${OrderTypeId}`, {username, cartItems, total}, {responseType: 'text'});
  }

  postCartItemParcel(username: string, cartItems: CartItem[], total: number, OrderTypeId: number) : Observable<any> {
    return this.httpClient.post(`${this.parcelsUrl}?id=${OrderTypeId}`, {username, cartItems, total}, {responseType: 'text'});
  }

  postCartItemDelivery(username: string, cartItems: CartItem[], total: number, delivery: Delivery) : Observable<any> {
    return this.httpClient.post(this.deliveryUrl, {username, cartItems, total, delivery}, {responseType: 'text'});
  }

}
