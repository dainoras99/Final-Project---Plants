import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { Plant } from 'src/app/common/plant';
import { User } from 'src/app/common/user';
import { UserItem } from 'src/app/common/user-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { UserItemsService } from 'src/app/services/user-items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChild('sidenav') public sidenav!: MatSidenav;
  cartSession!: CartSession
  cartItems: CartItem[] = [];
  user!: User;
  cartPlants: Plant[] = [];
  maybeWillWork: CartItem[] = [];
  useritemsForCheckout: UserItem[] = [];
  userCartItem!: UserItem

  realCartSession!: CartSession;

  constructor(public authenticationService: AuthenticationService,
    private cartService: CartService, 
    private loginService: LoginService) { }

   ngOnInit(): void {
    // this.handleUserSession(string: username);
    this.loginService.getRefreshRequired.subscribe(response => {
      this.loginService.getUserData().subscribe(data => {
        if (data != "username") {
        console.log("as jau bbd: " + data);
        this.handleUserSession(data);
        }
    });
   });
  }

  handleUserSession(username: string) {
    console.log("pasol nx 3");
    this.cartService.getCartSession(username).subscribe(
      data => {
        this.cartSession = data;
        this.cartService.setCartData(this.cartSession);
        console.log("bandom ziuret: " + this.cartSession.cartItems[0].plant.name);
      }
    )
  }

  deleteCartItem(cartItemId: number, cartPlantLength: number) {
    // this.cartService.deleteCartItem(cartItemId!).subscribe(
    //   {
    //     next: response => {
    //       if (cartPlantLength == 1) {
    //         this.cartService.getCartSession(this.user.username).subscribe(
    //           data => {
    //             this.cartSessions = data;
    //             this.deleteUserSession(this.cartSessions[0].id);
    //           }
    //         )
    //       }  
    //     },
    //     error: err => {
    //       console.log(err);
    //     }
    //   }
    // )
    }

    deleteUserSession(cartItemId: number) {
      // this.cartService.removeSession(cartItemId).subscribe(
      //   {
      //     next: response => {},
      //     error: err => {
      //       console.log(err);
      //     }
      //   }
      // )
    }

    updateCartItem(cartItem: CartItem, quantityChange: boolean) {
      // this.cartService.updateCartItem(cartItem.id, quantityChange).subscribe(
      //   {
      //     next: response => {},
      //     error: err => {
      //       console.log(err);
      //     }
      //   }
      // )
    }
}
  
