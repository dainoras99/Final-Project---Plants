import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl="http://localhost:8080/api/v1/login";

  constructor(private httpClient: HttpClient) { }

  loginUser(user: User): Observable<Object> {
    console.log(user);
    return this.httpClient.post(this.baseUrl, user);
  }
}
