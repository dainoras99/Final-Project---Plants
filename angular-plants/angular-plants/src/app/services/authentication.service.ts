import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isUserLoggedIn() {
    let user = localStorage.getItem('username');
    console.log(user);
    return !(user === null);
  }

  logOut() {
    localStorage.removeItem('username');
  }
}
