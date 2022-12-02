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


  getPlantCategories(): Observable<PlantCategory[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.plantCategory)
    );
  }

  searchProducts(theKeyword: string): Observable<Plant[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getPlants(searchUrl);
  }

  getPlant(productId: number) : Observable<Plant> {
    const plantUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Plant>(plantUrl);
  }

  getProductList(categoryId: number): Observable<Plant[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getPlants(searchUrl);
  }

  addPlant(plant: Plant, categoryName: string) {
    const addPlantUrl = "http://localhost:8080/api/v1/plants/addPlant";
    return this.httpClient.post(addPlantUrl, {plant, categoryName}, {responseType: 'text'});
  }

  removePlant(productId: number) {
    const removePlantUrl = `http://localhost:8080/api/v1/plants/deletePlant/${productId}`;
    return this.httpClient.delete(removePlantUrl, {responseType: 'text'});
  }

  private getPlants(searchUrl: string): Observable<Plant[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.plants)
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

