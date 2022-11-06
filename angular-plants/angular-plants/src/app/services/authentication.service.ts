import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../common/user';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  isUserLoggedIn() {
    let user = localStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    localStorage.removeItem('username');
    this.router.navigate(['/plants']);
  }

  getUserByUsername() : Observable<User> {
    let userName = localStorage.getItem('username');
    const searchUrl = `http://localhost:8080/api/users/search/findByUsername?name=${userName}`;
    return this.httpClient.get<User>(searchUrl);
  }

  searchForUserByUsername(username: string): boolean { //cia reik iskviest ta endpointa, nes jis neiskvieciamnas.
    const searchUrl = `http://localhost:8080/api/users/search/findByUsername?name=${username}`
    const statusCode = this.httpClient.get<HttpStatusCode>(searchUrl);
    this.httpClient.get(searchUrl,{responseType:'text', observe: 'response'}).pipe(map(data => {
      console.log("data status: " + data.status);
      if (data.status == 404) return false;
      else return true;
    }));
    return false;
  }

  getLoggedInUserName() {
    let username = localStorage.getItem('username');
    return username;
  }


}
