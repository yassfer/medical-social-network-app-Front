import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private baseUrl = 'http://localhost:8090/';

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get<User>(`${this.baseUrl}api/users/${id}`);
  }
}
