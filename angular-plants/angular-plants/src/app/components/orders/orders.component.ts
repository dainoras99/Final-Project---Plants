import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(public authenticationService: AuthenticationService, public orderService: OrderService, private titleService: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(`Užsakymai - www.augaluoaze.lt`);
    this.meta.updateTag({ name: 'description', content: 'Naudotojo užsakymų skiltis kurioje galite stebėti užsakytas prekės bei užsakymo būseną.' });
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