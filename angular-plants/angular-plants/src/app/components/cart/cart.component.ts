import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { Plant } from 'src/app/common/plant';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartSessions: CartSession[] = [];
  cartItems: CartItem[] = [];
  user!: User;
  cartPlants: Plant[] = [];
  maybeWillWork: CartItem[] = [];

  constructor(public authenticationService: AuthenticationService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.handleUser();
    this.cartService.getRefreshRequired.subscribe(response => {
      this.handleUser();
    });
  }

  handleUser() {
    this.authenticationService.getUserByUsername().subscribe(
      data => {
        this.user = data;
        this.handleCartItems();
      }
    );
  }

  handleCartItems() {
    this.cartService.getCartItemsByUserId(this.user.id).subscribe(
      data => {
        this.cartItems = data;
        this.cartItems.forEach(tempCartItem => this.handlePlants(tempCartItem.id, tempCartItem));
      }
    )
  }

  handlePlants(cartItemId: number, tempCartItem: CartItem) {
   this.cartService.getPlantsByCartItems(cartItemId).subscribe(
    data => {
      this.cartPlants.push(data);
      this.maybeWillWork.push(tempCartItem);
    }
   )
  }

  deleteCartItem(cartItemId: number, cartPlantLength: number) {
    this.cartService.deleteCartItem(cartItemId!).subscribe(
      {
        next: response => {
          console.log("cia: " + this.user.id);
          if (cartPlantLength == 1) {
            this.cartService.getCartSession(this.user.id).subscribe(
              data => {
                this.cartSessions = data;
                this.deleteUserSession(this.cartSessions[0].id);
              }
            )
          }  
        },
        error: err => {
          console.log(err);
        }
      }
    )
    }

    deleteUserSession(cartItemId: number) {
      this.cartService.removeSession(cartItemId).subscribe(
        {
          next: response => {
            
          },
          error: err => {
            console.log(err);
          }
        }
      )
    }
}
  
