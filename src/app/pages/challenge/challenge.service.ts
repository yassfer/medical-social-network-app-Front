import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challenge } from 'src/app/entities/Challenge';
@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private baseUrl = 'http://localhost:8080/challange'; 

  constructor(private http: HttpClient) { }

 /* getChallenge(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }*/

  createChallenge(challenge: Object): Observable<Object> {
    return this.http.post<number>(`${this.baseUrl}/add/6`, challenge);
  }

  /*updateChallenge(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }*/

  deleteChallenge(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getChallengesList(): Observable<any> {
    return this.http.get<Challenge[]>(`${this.baseUrl}/getAll`);
  }

  getMyChallengesList(): Observable<any> {
    return this.http.get<Challenge[]>(`${this.baseUrl}/getMyChallenges/7`);
  }
}
