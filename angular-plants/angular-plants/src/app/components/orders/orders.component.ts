import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  user!: User;
  orders: Order[] = [];
  orderItems: OrderItem[] = [];


  constructor(public authenticationService: AuthenticationService, public orderService: OrderService) { }

  ngOnInit(): void {
    this.handleUser();
  }

  handleUser() {
    this.authenticationService.getUserByUsername().subscribe(
      data => {
        data = 
        this.user = data;
        this.handleUserOrders(this.user.id);
      }
    );
  }

  handleUserOrders(userId: number) {
    this.orderService.getOrders(userId).subscribe(
      data => {
        let i = 0;
        this.orders = data;
        this.orders.forEach(order => {
          this.handleOrderItems(order, i);
          i++;
        });
      }
    )
  }

  handleOrderItems(order: Order, index: number) {
    this.orderService.getOrderItems(order.id).subscribe(
      data => {
        let y = 0;
        this.orders[index].orderItems = data;
        this.orders[index].orderItems.forEach(orderItem => {
          this.getOrderItemPlant(orderItem, index, y);
          y++;
        });
      }
    )
  }

  getOrderItemPlant(orderItem: OrderItem, indexI: number, indexY: number) {
    this.orderService.getOrderItemPlant(orderItem.id).subscribe(
      data => {
        this.orders[indexI].orderItems[indexY].plant = data;
      }
    )
  }

}
