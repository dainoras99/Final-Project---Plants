import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GiftCard } from '../common/gift-card';

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
}
