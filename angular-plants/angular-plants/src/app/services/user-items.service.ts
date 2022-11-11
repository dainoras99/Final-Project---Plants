import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plant } from '../common/plant';

@Injectable({
  providedIn: 'root'
})
export class UserItemsService {

  private userItems = new BehaviorSubject<any>([])
  selectedProducts = this.userItems.asObservable();

  //quantity
  private totalPrice = new BehaviorSubject<number>(0)
  selectedTotalPrice = this.totalPrice.asObservable();

  constructor() { }

  setProducts(products: any) {
    this.userItems.next(products);
  }

  setTotalPrice(total: any) {
    this.totalPrice.next(total);
  }
}
