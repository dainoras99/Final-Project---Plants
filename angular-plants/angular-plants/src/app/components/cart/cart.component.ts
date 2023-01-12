import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs/internal/Observable';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { Plant } from 'src/app/common/plant';
import { User } from 'src/app/common/user';
import { UserItem } from 'src/app/common/user-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { DiscountService } from 'src/app/services/discount.service';
import { LoginService } from 'src/app/services/login.service';
import { UserItemsService } from 'src/app/services/user-items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChild('sidenav') public sidenav!: MatSidenav;
  cartSession!: Observable<CartSession>;
  cartItems: CartItem[] = [];
  user!: User;
  cartPlants: Plant[] = [];
  maybeWillWork: CartItem[] = [];
  useritemsForCheckout: UserItem[] = [];
  userCartItem!: UserItem

  realCartSession!: CartSession;

  isDiscount!: Observable<boolean>

  constructor(public authenticationService: AuthenticationService,
    private cartService: CartService,
    private loginService: LoginService, private discountService: DiscountService) { }

  ngOnInit(): void {
    this.isDiscount = this.discountService.getisDiscount();
    this.loginService.getUserData().subscribe(data => {
      if (data != "username") {
        this.handleUserSession(data);
        this.cartSession = this.cartService.getCartData();
      }
    })
  }

  handleUserSession(username: string) {
    this.cartService.getCartSession(username).subscribe(
      data => {
        data.total_price = +data.total_price.toFixed(2);
        this.cartService.setCartData(data);
      }
    )
  }

  deleteCartItem(cartItemId: number) {
    this.cartService.deleteCartItem(cartItemId!).subscribe(
      {
        next: response => {
          this.cartService.setCartData(JSON.parse(response));
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }

  updateCartItem(cartItem: CartItem, quantityChange: boolean) {
    this.cartService.updateCartItem(cartItem.id, quantityChange).subscribe(
      {
        next: response => {
          this.cartService.setCartData(JSON.parse(response));
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }
}

