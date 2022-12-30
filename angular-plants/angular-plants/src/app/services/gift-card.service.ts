import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftCardObject } from '../common/gift-card-object';

@Injectable({
  providedIn: 'root'
})
export class GiftCardService {

  private baseUrl=`http://localhost:8080/api`;

  constructor(private httpClient: HttpClient) { }

  postGiftCard(name: string, message: string, email: string, sum: number, picture: number) {
    const addGiftCardUrl = `${this.baseUrl}/v1/postGiftCard`;
    return this.httpClient.post(addGiftCardUrl, {name, message, email, sum, picture}, {responseType: 'text'});
  }

  getGiftCard(code: string): Observable<GiftCardObject> {
    const getGiftCardUrl = `${this.baseUrl}/v1/getGiftCard/${code}`;
    return this.httpClient.get<GiftCardObject>(getGiftCardUrl);
  }

  updateGiftCard(giftCard: GiftCardObject) {
    const updateGiftCartUrl =`${this.baseUrl}/v1/updateGiftCard`
    return this.httpClient.put(updateGiftCartUrl, giftCard, {responseType: 'text'});
  }
}
