import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { CartSession } from 'src/app/common/cart-session';
import { Plant } from 'src/app/common/plant';
import { User } from 'src/app/common/user';
import { UserItem } from 'src/app/common/user-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { UserItemsService } from 'src/app/services/user-items.service';
import { PlantListComponent } from '../plant-list/plant-list.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChild('sidenav') public sidenav!: MatSidenav;

  cartSessions: CartSession[] = [];
  cartItems: CartItem[] = [];
  user!: User;
  cartPlants: Plant[] = [];
  maybeWillWork: CartItem[] = [];

  //cia checkoutui sitas listas
  useritemsForCheckout: UserItem[] = [];
  userCartItem!: UserItem


  constructor(public authenticationService: AuthenticationService,
    private cartService: CartService, private userItemsService: UserItemsService) { }


   ngOnInit(): void {
    this.handleUser();
    this.cartService.getRefreshRequired.subscribe(response => {
      this.handleUser();
    });
   }


  handleUser() {
    this.authenticationService.getUserByUsername().subscribe(
      data => {
        this.user = new User;
        this.user = data;
        this.handleCartItems();
      }
    );
  }

  handleCartItems() {
    this.cartService.getCartItemsByUserId(this.user.id).subscribe(
      data => {
        this.cartItems = [];
        this.cartItems = data;
        this.cartPlants = [];
        this.maybeWillWork = [];
        //checkoutui
        this.useritemsForCheckout = [];
        this.cartItems.forEach(tempCartItem => this.handlePlants(tempCartItem.id, tempCartItem));
      }
    )
  }

  handlePlants(cartItemId: number, tempCartItem: CartItem) {
   this.cartService.getPlantsByCartItems(cartItemId).subscribe(
    data => {
      tempCartItem.plant = data;
      this.cartItems = this.cartItems.sort((a,b)=> a.id-b.id);
      //perkeliam i checkout info
      this.userCartItem = {id: 0, name: "test", description: "test", price: 0, imageUrl: "", inStock: 0, quantity: 0};
      console.log("nu tipo id" + data.name)
      this.userCartItem.id = data.id;
      this.userCartItem.name = data.name;
      this.userCartItem.inStock = data.inStock;
      this.userCartItem.imageUrl = data.imageUrl;
      this.userCartItem.description = data.description;
      this.userCartItem.price = data.price;
      this.userCartItem.quantity = tempCartItem.quantity;

     this.useritemsForCheckout.push(this.userCartItem);
     this.useritemsForCheckout.forEach(tempUserItem => console.log("Username " + tempUserItem.name));
     console.log("trecio array element name: " + data.name)

     this.cartPlants.forEach(tempCartPlant => console.log("Cartname " + tempCartPlant.name));

      this.userItemsService.setProducts(this.useritemsForCheckout);
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

    updateCartItem(cartItem: CartItem, quantityChange: boolean) {
      this.cartService.updateCartItem(cartItem.id, quantityChange).subscribe(
        {
          next: response => {
            // cartItems.forEach(element => {
              
            // });
          },
          error: err => {
            console.log(err);
          }
        }
      )
    }
}
  
