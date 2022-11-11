import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl = "http://localhost:8080/api/v1/registration";
  message: string = "";
  constructor(private httpClient: HttpClient) { }

  registerUser(user: User) : Observable<any> {
    return this.httpClient.post(this.baseUrl, user, {responseType: 'text'});
  }
}
