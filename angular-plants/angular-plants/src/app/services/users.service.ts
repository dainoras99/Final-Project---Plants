import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    const usersUrl = `${this.baseUrl}/users`;
    return this.httpClient.get<GetResponseUsers>(usersUrl).pipe(
      map(response => response._embedded.users)
    );
  }

  removeUser(userId: number) {
      const userRemovalUrl = `${this.baseUrl}/v1/users/deleteUser/${userId}`
      return this.httpClient.delete(userRemovalUrl, {responseType: 'text'});
  }

  changeRole(userId: number, changeRole: boolean) {
      const changeRoleUrl = `${this.baseUrl}/v1/users/changeRole/${userId}`
      return this.httpClient.put(changeRoleUrl, changeRole, {responseType: 'text'});
  }

  // removePlant(productId: number) {
  //   const removePlantUrl = `http://localhost:8080/api/v1/plants/deletePlant/${productId}`;
  //   return this.httpClient.delete(removePlantUrl, {responseType: 'text'});
  // }
}

interface GetResponseUsers {
  _embedded: {
    users: User[];
  }
}