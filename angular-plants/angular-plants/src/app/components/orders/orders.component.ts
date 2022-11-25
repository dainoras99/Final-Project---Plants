import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { OrderType } from 'src/app/common/order-type';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(public authenticationService: AuthenticationService, public orderService: OrderService) { }

  ngOnInit(): void {
    this.handleUser();
  }

  handleUser() {
    this.handleUserOrders(this.authenticationService.getLoggedInUserName()!);
  }

  handleUserOrders(username: string) {
    this.orderService.getOrders(username).subscribe(
      data => {
        this.orders = data;
      }
    )
  }

}