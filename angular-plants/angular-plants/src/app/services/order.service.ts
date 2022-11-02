import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { CartItem } from '../common/cart-item';
import { Delivery } from '../common/delivery';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { Plant } from '../common/plant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private shopsUrl = "http://localhost:8080/api/v1/takefromshop";
  private parcelsUrl = "http://localhost:8080/api/v1/takefromparcel";
  private deliveryUrl = "http://localhost:8080/api/v1/takefromdelivery";

  private baseUrl = "http://localhost:8080/api"

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

  public getOrders(userId: number): Observable<Order[]> {
    const userOrdersUrl = `${this.baseUrl}/users/${userId}/orders`;
    return this.httpClient.get<GetResponseOrders>(userOrdersUrl).pipe(
      map(response => response._embedded.orders)
    );
  }

  public getOrderItems(orderId: number): Observable<OrderItem[]> {
    const orderItemsUrl = `${this.baseUrl}/orders/${orderId}/orderItems`;
    return this.httpClient.get<GetResponseOrderItems>(orderItemsUrl).pipe(
      map(response => response._embedded.orderItems)
    );
  }

  public getOrderItemPlant(orderItemId: number): Observable<Plant> {
    const orderItemPlantUrl = `${this.baseUrl}/orderItems/${orderItemId}/plant`;
    return this.httpClient.get<Plant>(orderItemPlantUrl);
  }
}

interface GetResponseOrders {
  _embedded: {
    orders: Order[];
  }
}

interface GetResponseOrderItems {
  _embedded: {
    orderItems: OrderItem[];
  }
}
