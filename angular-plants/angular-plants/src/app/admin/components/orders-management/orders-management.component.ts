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

  currentNavStatus = "Pateiktas";

  constructor(private ordersService: OrderService, private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
    this.selectedStatusValue = "Priimtas";
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
    this.currentNavStatus = "Pateiktas";
  }

  acceptedOrders() {
    this.loadOrders("priimtas");
    this.changeToggles();
    this.acceptedOrdersToggle = true;
    this.currentNavStatus = "Priimtas";
  }

  readyOrders() {
    this.loadOrders("paruoštas");
    this.changeToggles();
    this.readyOrdersToggle = true;
    this.currentNavStatus = "Paruoštas";
  }

  finishedOrders() {
    this.loadOrders("baigtas");
    this.changeToggles();
    this.finishedOrdersToggle = true;
    this.currentNavStatus = "Baigtas";
  }

  cancelledOrders() {
    this.loadOrders("atšauktas");
    this.changeToggles();
    this.cancelledOrdersToggle = true;
    this.currentNavStatus = "Atšauktas"
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
    if (this.selectedOrdersList.length == 0 ) alert("Turite pasirinkti bent vieną užsakymą prieš pakeičiant statusą");
    else if(confirm("Ar tikrai norite keisti užsakymo (-ų) statusą į " + this.selectedStatusValue))
    this.ordersService.updateOrdersStatuses(this.selectedOrdersList, this.selectedStatusValue).subscribe(
      {
        next: response => {
          this.loadOrders(this.currentNavStatus);
          this.selectedOrdersList = [];
        },
        error: err => {
          
        }
      }
    )
  }


  private changeToggles() {
    this.newOrdersToggle = false;
    this.acceptedOrdersToggle = false;
    this.readyOrdersToggle = false;
    this.finishedOrdersToggle = false;
    this.cancelledOrdersToggle = false;
  }
}

