import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartSession } from 'src/app/common/cart-session';
import { CartItem } from 'src/app/common/cart-item';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { CartService } from 'src/app/services/cart.service';
import { concat, forkJoin, Observable, Subject } from 'rxjs';
import { User } from 'src/app/common/user';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  cartSessions: CartSession[] = [];
  cartItems: CartItem[] = [];
  user!: User;

  totalPriceObservable: Subject<number> = new Subject<number>();
  totalQuantityObservable: Subject<number> = new Subject<number>();

  totalPrice: number = 0.02;
  totalQuantity: number = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject(AuthenticationService) public authenticationService: AuthenticationService, 
  private cartService: CartService, 
  private route: ActivatedRoute,
  private sideNavService: SidenavService) { }

  ngOnInit(): void {
    this.handleUser();
    this.cartService.getRefreshRequired.subscribe(response => {
      this.handleUser();
    });
  }

  ngOnDestroy(): void {

  }

  handleUser() {
    this.authenticationService.getUserByUsername().subscribe(
      data => {
        this.user = data;
        this.handleUserSession(this.user.id);
      }
    );
  }

  handleUserSession(userId: number) {
    this.cartService.getCartSession(userId).subscribe(
      data => {
        this.cartSessions = data;
        console.log(data)
        this.handleUserItems(this.cartSessions[0].id)
      }
    );
  }

  handleUserItems(cartSessionId: number) {
    this.cartService.getCartItems(cartSessionId).subscribe(
      data => {
        this.cartItems = data;
      }
    );
  }

  updateCartStatusTotalPrice() {
    this.totalPriceObservable.subscribe(
      data => this.totalPrice = data
    );
  }

  updateCartStatusTotalQuantity() {
    this.totalQuantityObservable.subscribe(
      data => this.totalQuantity = data
    );
  }

  updateXUne() {
    console.log("cartSessions[0].id" + this.cartSessions[0].id);
    console.log("totalPrice: " + this.totalPrice);
    console.log("totalQuantity: " + this.totalQuantity);
  }

  clickSideNav() { 
    this.sideNavService.toggle();
  }
}
