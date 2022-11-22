import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { CartSession } from 'src/app/common/cart-session';
import { CartItem } from 'src/app/common/cart-item';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { CartService } from 'src/app/services/cart.service';
import { Subject } from 'rxjs';
import { User } from 'src/app/common/user';
import { SidenavService } from 'src/app/services/sidenav.service';
import { CartComponent } from '../cart/cart.component';
import { UserItemsService } from 'src/app/services/user-items.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  @ViewChild(CartComponent) cartComponent!:CartComponent;
  cartSession!: CartSession;
  cartItems: CartItem[] = [];
  user!: User;

  destroy$: Subject<boolean> = new Subject<boolean>();

  cartSessionReal!: CartSession

  constructor(@Inject(AuthenticationService) public authenticationService: AuthenticationService, 
  private cartService: CartService,
  private sideNavService: SidenavService,
  private userItemsService: UserItemsService,
  private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getRefreshRequired.subscribe(response => {
      this.loginService.getUserData().subscribe(data => {
        if (data != "username") {
        console.log("as jau bbd: " + data);
        this.handleUserSession(data);
        }
      });
    });
  }

  // handleUser() {
  //   this.authenticationService.getUserByUsername().subscribe(
  //     data => { 
  //       this.user = data;
  //       this.cartService.getCartData().subscribe(data => {
  //         this.cartSession = data;
  //         this.userItemsService.setTotalPrice(this.cartSession.total_price);
  //       })
  //       //this.handleUserSession(this.user.username);

  //     }
  //   );
  // }

  handleUserSession(username: string) {
    this.cartService.getCartData().subscribe(
      data => {
        this.cartSession = data;
        console.log("ar cia? " + this.cartSession.total_price)
        this.userItemsService.setTotalPrice(this.cartSession.total_price);
      }
    );
  }

  clickSideNav() { 
    this.sideNavService.toggle();
  }
}
