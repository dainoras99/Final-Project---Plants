import { ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { CartSession } from 'src/app/common/cart-session';
import { CartItem } from 'src/app/common/cart-item';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { CartService } from 'src/app/services/cart.service';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/common/user';
import { SidenavService } from 'src/app/services/sidenav.service';
import { CartComponent } from '../cart/cart.component';
import { UserItemsService } from 'src/app/services/user-items.service';
import { LoginService } from 'src/app/services/login.service';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  @ViewChild(CartComponent) cartComponent!:CartComponent;
  cartSession!: Observable<CartSession>;
  cartItems: CartItem[] = [];
  user!: User;

  destroy$: Subject<boolean> = new Subject<boolean>();

  cartSessionReal!: CartSession;

  isDiscount!: Observable<boolean>;

  constructor(@Inject(AuthenticationService) public authenticationService: AuthenticationService, 
  private cartService: CartService,
  private sideNavService: SidenavService,
  private userItemsService: UserItemsService,
  private loginService: LoginService,
  private discountService: DiscountService) { }

  ngOnInit(): void {
    this.isDiscount = this.discountService.getisDiscount();
    console.log("cart statuse cia: " + this.isDiscount);
    this.handleUserSession();
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

  handleUserSession() {
    this.cartSession = this.cartService.getCartData();
    // this.cartService.getCartData().subscribe(
    //   data => {
    //     this.cartSession = data;
    //     console.log("ar cia? " + this.cartSession.total_price)
    //     this.userItemsService.setTotalPrice(this.cartSession.total_price);
    //   }
    // );
  }

  clickSideNav() { 
    this.sideNavService.toggle();
  }
}
