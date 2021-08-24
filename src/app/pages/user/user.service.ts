import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8090/";

  constructor(private httpClient: HttpClient) { }
  getUserById(id: number): Observable<any> {
    return this.httpClient.get<User>(`${this.baseURL}api/users/${id}`);
  }
}
