import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';
import { CartSession } from 'src/app/common/cart-session';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

  @ViewChild('sidenav') public sidenav!: MatSidenav;
  showSearchResults = true;
  opened: any = false;
  cartSession!: Observable<CartSession>;
  isCheckoutPage: boolean = false;
  navbarOpen = false;

  constructor(private sideNavService: SidenavService, private dialogRef: MatDialog,
    public authenticationService: AuthenticationService, private cartService: CartService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isCheckoutPage = this.route.snapshot.paramMap.has('checkout');
    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      this.sidenav.toggle();
      this.loadCart();
    });


  }
  loadCart() {
    this.cartService.getCartData;
  }

  openDialog() {
    this.dialogRef.open(RegistrationComponent, {
        width: "100vw",
        height: "100vh",
        maxWidth: "900px",
        maxHeight: "750px"
    });
  }

  openLoginDialog() {
    this.dialogRef.open(LoginComponent, {
        width: "100vw",
        height: "100vh",
        maxWidth: "500px",
        maxHeight: "400px"
    });
  }

  refreshSearchResults() {
    this.showSearchResults = false;
    setTimeout(() => this.showSearchResults = true);
  }

  onOpen(): void {}

  openNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
