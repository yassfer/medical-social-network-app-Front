import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get<User>(`${this.baseURL}api/users/${id}`);
  }

  getScoreById(id: number): Observable<any> {
    return this.httpClient.get<User>(`${this.baseURL}api/users/getScore/${id}`);
  }
  updateScore(idu:number, score: number): Observable<Object> {
    return this.httpClient.get(`${this.baseURL}api/users/score/${idu}/${score}`);
  }
}
