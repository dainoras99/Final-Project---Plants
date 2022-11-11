import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Parcel } from '../common/parcel';
import { Shop } from '../common/shop';

@Injectable({
  providedIn: 'root'
})
export class OrderTypesService {

  private shopsUrl = "http://localhost:8080/api/shops";
  private parcelsUrl = "http://localhost:8080/api/parcels";

  constructor(private httpClient: HttpClient) { }

  getShopsList(): Observable<Shop[]> {
    return this.httpClient.get<GetResponseShops>(this.shopsUrl).pipe(
      map(response => response._embedded.shops)
    );
  }

  getParcelsList(): Observable<Parcel[]> {
    return this.httpClient.get<GetResponseParcels>(this.parcelsUrl).pipe(
      map(response => response._embedded.parcels)
    );
  }
}

interface GetResponseShops {
  _embedded: {
    shops: Shop[];
  }
}

interface GetResponseParcels {
  _embedded: {
    parcels: Parcel[];
  }
}