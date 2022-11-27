import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../common/user';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { CartSession } from '../common/cart-session';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  cartSession!: CartSession;

  constructor(private httpClient: HttpClient, private router: Router, private cartService: CartService, private loginService: LoginService) { }

  isUserLoggedIn() {
    let user = localStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    localStorage.removeItem('username');
    this.cartService.setCartData(this.cartSession);
    this.loginService.setUserData("username");
    this.router.navigate(['/plants']);
  }

  getUserByUsername() : Observable<User> {
    let userName = localStorage.getItem('username');
    const searchUrl = `http://localhost:8080/api/users/search/findByUsername?name=${userName}`;
    return this.httpClient.get<User>(searchUrl);
  }

  getLoggedInUserName() {
    let username = localStorage.getItem('username');
    return username;
  }

  isAdmin() {
    
  }
}
