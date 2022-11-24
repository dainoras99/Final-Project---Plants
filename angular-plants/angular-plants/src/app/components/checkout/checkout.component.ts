import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { Shop } from 'src/app/common/shop';
import { UserItem } from 'src/app/common/user-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderTypesService } from 'src/app/services/order-types.service';
import { OrderService } from 'src/app/services/order.service';
import { UserItemsService } from 'src/app/services/user-items.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  typeSelected: any;
  shopSelected: any;
  cartSession!: CartSession;
  selectedTotal!: number;
  shopId!: number;
  cartItems: CartItem[] = [];
  cartItem!: CartItem
  shopsList: Shop[] = [];

  checkoutFormGroup!: FormGroup;
  constructor(private router: Router,
    private cartService: CartService,
    private orderTypesService: OrderTypesService,
    private orderService: OrderService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.handleShops();
    this.cartService.getCartData().subscribe((data) => {
      this.cartSession = data;
    });
    // this.userItemsService.selectedProducts.subscribe((data) => {
    //   this.selectedProducts = data;
    // });
    // this.userItemsService.selectedTotalPrice.subscribe((data) => {
    //   this.selectedTotal = data;
    // });
  }

  handleShops() {
    this.orderTypesService.getShopsList().subscribe(
      data => {
        this.shopsList = data;
      }
    );
  }

  selectedType(event: any) {
    this.typeSelected = event.target.value;
    if (this.typeSelected === "Atsiimsiu parduotuvėje") this.router.navigate(['/checkout']);
    if (this.typeSelected === "Pristatyti į namus") this.router.navigate(['checkout/home']);
    if (this.typeSelected === "Pristatyti į paštomatą") this.router.navigate(['checkout/parcel']);
  }

  selectedShop(event: any) {
    this.shopSelected = event.target.value;
  }

  get getTypeSelected() {
    return this.typeSelected;
  }

  postOrder() {
  if (this.shopSelected === undefined) this.shopSelected = "Vilnius, Šeimyniškių g. 31";

  this.orderService.postOrder(this.cartSession, this.authenticationService.getLoggedInUserName()!, "shop",  this.shopId, null!)
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

  }


  //   this.selectedProducts.forEach(element => {
  //     this.cartItem = new CartItem(0, 0, null!);
  //     this.cartItem.id = element.id;
  //     this.cartItem.quantity = element.quantity;
  //     this.cartItems.push(this.cartItem);
  //   });
  //   let username = this.authenticationService.getLoggedInUserName();
  //   if (this.shopSelected === undefined) this.shopSelected = "Vilnius, Šeimyniškių g. 31";

  //   this.shopsList.forEach(shop => {
  //     console.log("cia: " + shop.address);
  //     console.log("shop selected: " + this.shopSelected);
  //     console.log("shop city address: " + shop.city + ", " + shop.address)
  //     if (this.shopSelected === shop.address + ", " + shop.city) this.shopId = shop.id;
  //   });

  //   this.orderService.postCartItemShop(username!, this.cartItems,
  //     this.selectedTotal, this.shopId).subscribe(
  //       {
  //         next: response => {
  //           alert("Sėkmingai pateiktas užsakymas");
  //           this.router.navigate(['/plants']);
  //         },
  //         error: err => {
  //           console.log(err);
  //           alert("negerai");
  //         }
  //       }
  //     )
}