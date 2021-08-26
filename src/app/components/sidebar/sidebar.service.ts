import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private baseURL = "http://localhost:8080/api/";


  constructor(private httpClient: HttpClient) { }

  getCurrentUser(id: number): Observable<object> {
    return this.httpClient.get<User>(`${this.baseURL}users/${id}`);
  }
}
