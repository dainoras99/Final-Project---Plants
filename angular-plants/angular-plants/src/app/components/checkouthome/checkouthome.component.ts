import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Delivery } from 'src/app/common/delivery';
import { UserItem } from 'src/app/common/user-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderTypesService } from 'src/app/services/order-types.service';
import { OrderService } from 'src/app/services/order.service';
import { UserItemsService } from 'src/app/services/user-items.service';

@Component({
  selector: 'app-checkouthome',
  templateUrl: './checkouthome.component.html',
  styleUrls: ['./checkouthome.component.css']
})
export class CheckouthomeComponent implements OnInit {

  delivery: Delivery = new Delivery();
  typeSelected: any;
  radioButtonSelected: any;
  cartItems: CartItem[] = [];
  cartItem!: CartItem

  selectedProducts: UserItem[] = [];
  selectedTotal!: number;
  constructor(private router: Router, private userItemsService: UserItemsService, private authenticationService: AuthenticationService,
    private orderTypesService: OrderTypesService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.userItemsService.selectedProducts.subscribe((data) => {
      this.selectedProducts = data;
    });
    this.userItemsService.selectedTotalPrice.subscribe((data) => {
      this.selectedTotal = data;
    });
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    if (this.typeSelected === "Atsiimsiu parduotuvėje") this.router.navigate(['/checkout']);
    if (this.typeSelected === "Pristatyti į namus") this.router.navigate(['checkout/home']);
    if (this.typeSelected === "Pristatyti į paštomatą") this.router.navigate(['checkout/parcel']);
    console.log(this.typeSelected);
  }

  radioButtonChecked0(event: any) {
    
    if (this.radioButtonSelected != undefined)this.userItemsService.setTotalPrice(this.selectedTotal - +this.radioButtonSelected);
    this.userItemsService.setTotalPrice(this.selectedTotal + 0);
    this.radioButtonSelected = event.target.value;
  }
  radioButtonChecked05(event: any) {
    if (this.radioButtonSelected != undefined) this.userItemsService.setTotalPrice(this.selectedTotal - +this.radioButtonSelected);
    this.userItemsService.setTotalPrice(this.selectedTotal + 0.5);
    this.radioButtonSelected = event.target.value;
  }
  radioButtonChecked1(event: any) {
    if (this.radioButtonSelected != undefined) this.userItemsService.setTotalPrice(this.selectedTotal - +this.radioButtonSelected);
    this.userItemsService.setTotalPrice(this.selectedTotal + 1);
    this.radioButtonSelected = event.target.value;
  }
  radioButtonChecked2(event: any) {
    if (this.radioButtonSelected != undefined) this.userItemsService.setTotalPrice(this.selectedTotal - +this.radioButtonSelected);
    this.userItemsService.setTotalPrice(this.selectedTotal + 2);
    this.radioButtonSelected = event.target.value;
  }

  get getTypeSelected() {
    return this.typeSelected;
  }

  postOrder() {
    this.selectedProducts.forEach(element => {
      this.cartItem = new CartItem(0, 0);
      this.cartItem.id = element.id;
      this.cartItem.quantity = element.quantity;
      this.cartItems.push(this.cartItem);
    });
    let username = this.authenticationService.getLoggedInUserName();
    
    if (this.radioButtonSelected === undefined) this.radioButtonSelected = "0";
    this.delivery.courierTips = +this.radioButtonSelected;

    this.orderService.postCartItemDelivery(username!, this.cartItems,
      this.selectedTotal, this.delivery).subscribe(
        {
          next: response => {
            alert("Sėkmingai pateiktas užsakymas");
            this.router.navigate(['/plants']);
          },
          error: err => {
            console.log(err);
            alert("negerai");
          }
        }
      )
  }

}
