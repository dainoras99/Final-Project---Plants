import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { Delivery } from 'src/app/common/delivery';
import { UserItem } from 'src/app/common/user-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
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
  errors: boolean = false;
  tips = "none";
  cartSession!: CartSession

  constructor(private router: Router,
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartService.getCartData().subscribe((data) => {
      this.cartSession = data;
    });
  }

  deliveryForm = new FormGroup({
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    zip: new FormControl("", [Validators.required])
  });

  get Address(): FormControl {
    return this.deliveryForm.get("address") as FormControl;
  }

  get City(): FormControl {
    return this.deliveryForm.get("city") as FormControl;
  }

  get Zip(): FormControl {
    return this.deliveryForm.get("zip") as FormControl;
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    if (this.typeSelected === "Atsiimsiu parduotuvėje") this.router.navigate(['/checkout']);
    if (this.typeSelected === "Pristatyti į namus") this.router.navigate(['checkout/home']);
    if (this.typeSelected === "Pristatyti į paštomatą") this.router.navigate(['checkout/parcel']);
  }

  radioButtonChecked0(event: any) {

    if (this.radioButtonSelected != undefined) this.cartSession.total_price -= +this.radioButtonSelected;
    this.cartSession.total_price += 0;
    this.radioButtonSelected = event.target.value;
    this.tips = 'none';
    this.cartService.setCartData(this.cartSession);



    // if (this.radioButtonSelected != undefined) this.userItemsService.setTotalPrice(this.selectedTotal - +this.radioButtonSelected);
    // this.userItemsService.setTotalPrice(this.selectedTotal + 0);
    // this.radioButtonSelected = event.target.value;
    // this.tips = 'none';
  }

  radioButtonChecked05(event: any) {

    if (this.radioButtonSelected != undefined) this.cartSession.total_price -= +this.radioButtonSelected;
    this.cartSession.total_price += 0.5;
    this.radioButtonSelected = event.target.value;
    this.tips = 'inline';
    this.cartService.setCartData(this.cartSession);


    // if (this.radioButtonSelected != undefined) this.userItemsService.setTotalPrice(this.selectedTotal - +this.radioButtonSelected);
    // this.userItemsService.setTotalPrice(this.selectedTotal + 0.5);
    // this.radioButtonSelected = event.target.value;
    // this.tips = 'inline';
  }

  radioButtonChecked1(event: any) {

    if (this.radioButtonSelected != undefined) this.cartSession.total_price -= +this.radioButtonSelected;
    this.cartSession.total_price += 1;
    this.radioButtonSelected = event.target.value;
    this.tips = 'inline';

    // if (this.radioButtonSelected != undefined) this.userItemsService.setTotalPrice(this.selectedTotal - +this.radioButtonSelected);
    // this.userItemsService.setTotalPrice(this.selectedTotal + 1);
    // this.radioButtonSelected = event.target.value;
    // this.tips = 'inline';
  }

  radioButtonChecked2(event: any) {

    if (this.radioButtonSelected != undefined) this.cartSession.total_price -= +this.radioButtonSelected;
    this.cartSession.total_price += 2;
    this.radioButtonSelected = event.target.value;
    this.tips = 'inline';

    // if (this.radioButtonSelected != undefined) this.userItemsService.setTotalPrice(this.selectedTotal - +this.radioButtonSelected);
    // this.userItemsService.setTotalPrice(this.selectedTotal + 2);
    // this.radioButtonSelected = event.target.value;
    // this.tips = 'inline';
  }

  get getTypeSelected() {
    return this.typeSelected;
  }

  postOrder() {
     
    if (this.deliveryForm.invalid) {
       this.errors = true;
       return;
    }
    this.errors = false;

    if (this.radioButtonSelected === undefined) this.radioButtonSelected = "0";
    this.delivery.courierTips = +this.radioButtonSelected;

    this.orderService.postOrder(this.cartSession, this.authenticationService.getLoggedInUserName()!, "delivery", null!, this.delivery)
    .subscribe(
      {
        next: response => {
          alert(response);
          this.router.navigate(['/plants']);
        },
        error: err => {
          alert("Svetainės klaida, kreipkitės į administratorių");
          this.router.navigate(['/plants']);
        }
      }
    );



  //   this.selectedProducts.forEach(element => {
  //     this.cartItem = new CartItem(0, 0, null!);
  //     this.cartItem.id = element.id;
  //     this.cartItem.quantity = element.quantity;
  //     this.cartItems.push(this.cartItem);
  //   });
  //   let username = this.authenticationService.getLoggedInUserName();
  //   if (this.radioButtonSelected === undefined) this.radioButtonSelected = "0";
  //   this.delivery.courierTips = +this.radioButtonSelected;
  //   this.orderService.postCartItemDelivery(username!, this.cartItems,
  //     this.selectedTotal, this.delivery).subscribe(
  //       {
  //         next: response => {
  //           alert("Sėkmingai pateiktas užsakymas");
  //           this.router.navigate(['/plants']);
  //         },
  //         error: err => {
  //           console.log(err);
  //           alert("negerai");
  //           this.errors = true;
  //         }
  //       }
  //     )
   }
}