import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../common/plant';
import { map } from 'rxjs/operators';
import { PlantCategory } from '../common/plant-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/plants"
  private categoryUrl = "http://localhost:8080/api/plant-category"

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Plant[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.plants)
    );
  }

  getPlantCategories(): Observable<PlantCategory[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.plantCategory)
    );
  }
}

interface GetResponseProduct {
  _embedded: {
    plants: Plant[];
  }
}

interface GetResponseCategory {
  _embedded: {
    plantCategory: PlantCategory[];
  }
}
