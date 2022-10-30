import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Parcel } from 'src/app/common/parcel';
import { UserItem } from 'src/app/common/user-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderTypesService } from 'src/app/services/order-types.service';
import { OrderService } from 'src/app/services/order.service';
import { UserItemsService } from 'src/app/services/user-items.service';

@Component({
  selector: 'app-checkoutparcel',
  templateUrl: './checkoutparcel.component.html',
  styleUrls: ['./checkoutparcel.component.css']
})
export class CheckoutparcelComponent implements OnInit {
  typeSelected: any;
  selectedProducts: UserItem[] = [];
  selectedTotal!: number;

  parcelList: Parcel[] = [];

  parcelSelected: any;
  parcelId!:number;

  cartItems: CartItem[] = [];
  cartItem!: CartItem;

  constructor(private router: Router, private userItemsService: UserItemsService,
    private orderTypesService: OrderTypesService, private authenticationService: AuthenticationService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.handleParcels();
    this.userItemsService.selectedProducts.subscribe((data) => {
      this.selectedProducts = data;
    });
    this.userItemsService.selectedTotalPrice.subscribe((data) => {
      this.selectedTotal = data;
    });
  }

  handleParcels() {
   this.orderTypesService.getParcelsList().subscribe(
      data => {
        this.parcelList = data;
      }
    );
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    if (this.typeSelected === "Atsiimsiu parduotuvėje") this.router.navigate(['/checkout']);
    if (this.typeSelected === "Pristatyti į namus") this.router.navigate(['checkout/home']);
    if (this.typeSelected === "Pristatyti į paštomatą") this.router.navigate(['checkout/parcel']);
    console.log(this.typeSelected);
  }

  selectedParcel(event: any) {
    this.parcelSelected = event.target.value;
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

    if (this.parcelSelected === undefined) this.parcelSelected = "Akropolis - Vilnius, Ozo g. 25, 07150";
    
    this.parcelList.forEach(parcel => {
      //{{parcel.name}} - {{parcel.city}}, {{parcel.address}}, {{parcel.zipCode}}
        if (this.parcelSelected === parcel.name + " - " + parcel.city + ", " + parcel.address + ", " + parcel.zipCode) this.parcelId = parcel.id;
    });


    this.orderService.postCartItemParcel(username!, this.cartItems,
    this.selectedTotal, this.parcelId).subscribe(
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
