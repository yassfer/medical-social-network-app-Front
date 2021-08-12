import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from './community';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {
  private Url = 'http://localhost:8080/communities'; 

  constructor(private http: HttpClient) { }
  deleteCommunity(id: number): Observable<any> {
    return this.http.delete(`${this.Url}/delete/${id}`, { responseType: 'text' });
  }
  createCommunity(communityItem: Community): Observable<Object> {
    return this.http.post<number>(`${this.Url}/Create/1`, communityItem);}
  
  getCommunityList(): Observable<Community[]> {
      return this.http.get<Community[]>(`${this.Url}/getAll`);
    }
    getCommunityById(id: number): Observable<Community>{
      return this.http.get<Community>(`${this.Url}/getById/${id}`);
    }
    getCommunityByAdmin() : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}/getByAdmin/2`);
    }




}