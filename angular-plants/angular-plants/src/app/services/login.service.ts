import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl="http://localhost:8080/api/v1/login";

  private refreshRequired = new Subject<void>();
  
  get getRefreshRequired() {
    return this.refreshRequired;
  }


  private sharedUserData = new BehaviorSubject<string>("username");

  setUserData(userData: string) {
    this.sharedUserData.next(userData);
  }

  getUserData(): Observable<string> {
    return this.sharedUserData.asObservable();
  }


  constructor(private httpClient: HttpClient) { }

  loginUser(user: User): Observable<Object> {
    console.log(user);
    return this.httpClient.post(this.baseUrl, user).pipe(
      tap(()=>{
        this.getRefreshRequired.next();
      })
    );;
  }
}
