import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {

  orders : Order[] = [];



  newOrdersToggle: boolean = true;
  acceptedOrdersToggle: boolean = false;
  readyOrdersToggle: boolean = false;
  cancelledOrdersToggle: boolean = false;
  finishedOrdersToggle: boolean = false;

  constructor(private ordersService: OrderService, private dialogRef: MatDialog) { 

  }

  ngOnInit(): void {
    this.loadOrders("pateiktas");
  }

  private loadOrders(status: string) {
    this.ordersService.getOrdersByStatus(status).subscribe(data => {
      this.orders = data;
    });
  }

  newOrders() {
    this.loadOrders("pateiktas");
    this.changeToggles();
    this.newOrdersToggle = true;
  }

  acceptedOrders() {
    this.loadOrders("priimtas");
    this.changeToggles();
    this.acceptedOrdersToggle = true;
  }

  readyOrders() {
    this.loadOrders("paruoštas");
    this.changeToggles();
    this.readyOrdersToggle = true;
  }

  finishedOrders() {
    this.loadOrders("baigtas");
    this.changeToggles();
    this.finishedOrdersToggle = true;
  }

  cancelledOrders() {
    this.loadOrders("atšauktas");
    this.changeToggles();
    this.cancelledOrdersToggle = true;
  }


  changeStatus() {
    throw new Error('Method not implemented.');
  }
  

  private changeToggles() {
    this.newOrdersToggle = false;
    this.acceptedOrdersToggle = false;
    this.readyOrdersToggle = false;
    this.finishedOrdersToggle = false;
    this.cancelledOrdersToggle = false;
  }
}

