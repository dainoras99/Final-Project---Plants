import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private orderService: OrderService, private authenticationService: AuthenticationService) { }

  private discountSubject = new BehaviorSubject<boolean>(false);
  discount$ = this.discountSubject.asObservable();


  getisDiscount(): Observable<boolean> {
    return this.discountSubject.asObservable();
  }

  setisDiscount(value: boolean) {
    this.discountSubject.next(value);
  }
}
