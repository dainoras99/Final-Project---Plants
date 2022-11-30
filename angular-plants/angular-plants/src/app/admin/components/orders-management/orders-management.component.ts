import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/common/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {

  selectedStatusValue: any;
  orders: Order[] = [];
  selectedOrdersList: Order[] = [];

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

  selectedOrders(order: any, event: any) {
    var index = this.selectedOrdersList.indexOf(order);
    if (event.target.checked)
        this.selectedOrdersList.push(order);
      else
          this.selectedOrdersList.splice(index, 1)
    console.log(this.selectedOrdersList);
  }

  selectedStatus(event: any) {
    this.selectedStatusValue = event.target.value;
    console.log(this.selectedStatusValue)
  }

  changeStatus() {
    
  }


  private changeToggles() {
    this.newOrdersToggle = false;
    this.acceptedOrdersToggle = false;
    this.readyOrdersToggle = false;
    this.finishedOrdersToggle = false;
    this.cancelledOrdersToggle = false;
  }
}

