import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  isUserLoggedIn() {
    let user = localStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    localStorage.removeItem('username');
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


}
