import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
// https://stackoverflow.com/questions/72937664/how-to-get-user-details-after-login-in-angular
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter()
  private baseUrl="http://localhost:8080/api/v1/login";

  constructor(private httpClient: HttpClient) { }

  loginUser(user: User): Observable<Object> {
    console.log(user);
    return this.httpClient.post(this.baseUrl, user).pipe(map(Users => {
      this.setToken(Users[0].name);
      this.userSubject.next(Users[0]); // << this
      this.getLoggedInName.emit(true);
      return Users;
    }));;
  }
}
