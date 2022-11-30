import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { CartItem } from '../common/cart-item';
import { CartSession } from '../common/cart-session';
import { Delivery } from '../common/delivery';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { OrderType } from '../common/order-type';
import { Parcel } from '../common/parcel';
import { Plant } from '../common/plant';
import { Shop } from '../common/shop';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private postOrderUrl = 'http://localhost:8080/api/v1/postOrder';
  private baseUrl = 'http://localhost:8080/api/v1';


  constructor(private httpClient: HttpClient) { }

  postOrder(
    cartSession: CartSession,
    username: string,
    orderType: string,
    orderTypeId: number,
    delivery: Delivery
  ) {
    return this.httpClient.post(
      this.postOrderUrl,
      { cartSession, username, orderType, orderTypeId, delivery },
      { responseType: 'text' }
    );
  }

  public getOrders(username: string): Observable<Order[]> {
    const userOrdersUrl = `${this.baseUrl}/${username}/orders`;
    return this.httpClient.get<GetResponseOrders>(userOrdersUrl).pipe(
      map(response => response.orders)
    );
  }

  public getOrdersByStatus(status: string) {
    const orderByStatusUrl = `${this.baseUrl}/orders/${status}`;
    return this.httpClient.get<Order[]>(orderByStatusUrl);
  }

  updateOrdersStatuses(orders: Order[], status: string) {
    return this.httpClient.put(`${this.baseUrl}/updateOrdersStatuses`, {orders, status}, {responseType: 'text'});
  }

}
interface GetResponseOrders {
  orders: Order[];
}

