import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { CartSession } from '../common/cart-session';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../common/cart-item';
import { User } from '../common/user';
import { Subject } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/internal/operators/tap';
import { Plant } from '../common/plant';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl=`http://localhost:8080/api`;
  private refreshRequired = new Subject<void>();
  private refreshCartComponent= new BehaviorSubject<boolean>(true);

  private sharedCartData = new BehaviorSubject<CartSession>(<CartSession>{});


  get getRefreshCartComponent() {
    return this.refreshCartComponent;
  }
  get getRefreshRequired() {
    return this.refreshRequired;
  }

  setCartData(cartData: CartSession) {
    this.sharedCartData.next(cartData);
  }

  getCartData(): Observable<CartSession> {
    return this.sharedCartData.asObservable();
  }
  constructor(private httpClient: HttpClient) { }

  getCartSession(username: string) : Observable<CartSession> {
    const cartSessionUrl = `${this.baseUrl}/v1/userSession/${username}`;
    return this.httpClient.get<CartSession>(cartSessionUrl);
  }

   getCartItems(cartSessionId: number): Observable<CartItem[]> {
    const cartItemsUrl = `${this.baseUrl}/cartSessions/${cartSessionId}/cartItems`
    return this.httpClient.get<getResponseCartItems>(cartItemsUrl).pipe(
      map(response => response._embedded.cartItems)
    );
  }

  getCartItemsByUserId(userId: number): Observable<CartItem[]> {
    const cartItemsByUserUrl = `${this.baseUrl}/users/${userId}/cartItems`
    return this.httpClient.get<getResponseCartItems>(cartItemsByUserUrl).pipe(
      map(response => response._embedded.cartItems)
    );
  }

  getPlantsByCartItems(cartItemId: number): Observable<Plant> {
    const plantsByCartItemIdUrl = `${this.baseUrl}/cartItems/${cartItemId}/plant`
    return this.httpClient.get<Plant>(plantsByCartItemIdUrl);
  }

  getUserByUsername(userName: string) : Observable<User> {
    const searchUrl = `${this.baseUrl}/users/search/findByUsername?name=${userName}`;
    return this.httpClient.get<User>(searchUrl);
  }

  postCartItem(username: string, plantName: string) : Observable<any> {
    this.refreshCartComponent.next(false);
    this.refreshCartComponent.subscribe(l => console.log(l));
    return this.httpClient.post(`${this.baseUrl}/v1/createSession`, {username, plantName}, {responseType: 'text'}).pipe(
      tap(()=>{
        this.getRefreshRequired.next();
      })
    );
  }
  
  deleteCartItem(cartItemId: number) : Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/v1/deleteCartItem?id=${cartItemId}`, {responseType: 'text'}).pipe(
      tap(()=>{
        this.getRefreshRequired.next();
      })
    );
  }

  removeSession(sessionId: number) : Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/v1/deleteCartSession?id=${sessionId}`, {responseType: 'text'});
  }

  updateCartItem(cartItemId: number, quantityChange: boolean) {
    return this.httpClient.put(`${this.baseUrl}/v1/updateCartItem?id=${cartItemId}`, quantityChange, {responseType: 'text'}).pipe(
      tap(()=>{
        this.getRefreshRequired.next();
      })
    );
  }
}

interface getResponseCartItems {
  _embedded: {
    cartItems: CartItem[];
  }
}

interface getResponseSession {
  _embedded: {
    cartSessions: CartSession[];
  }
}

interface GetResponseSession {
  cartSession: CartSession
}