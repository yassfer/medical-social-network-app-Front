import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Community } from 'src/app/entities/Community';

@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {
  private Url = 'http://localhost:8080/communities/';

  constructor(private http: HttpClient) { }
  deleteCommunity(id: number): Observable<any> {
    return this.http.delete(`${this.Url}delete/${id}`, { responseType: 'text' });
  }
  createCommunity(id : number ,file: FormData): Observable<any> {
    return this.http.post<Community>(`${this.Url}Create/${id}`, file);}

    saveCommunity(id : number , communtiy : Community): Observable<any> {
      return this.http.put(`${this.Url}save/${id}`, communtiy);}

  getCommunityList(): Observable<Community[]> {
      return this.http.get<Community[]>(`${this.Url}getAll`);
    }
    getCommunityById(id: number): Observable<Community>{
      return this.http.get<Community>(`${this.Url}getById/${id}`);
    }
    getCommunityByAdmin(id : number) : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}getByAdmin/${id}`);
    }
    updateCommunity(id :number, community :Community ): Observable<Object>{
      return this.http.put<number>(`${this.Url}update/${id}` , community)
    }
    getFollowedCommunities(id : number) : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}getFollowedCommunities/${id}`);
    }
    getUnFollowedCommunities(id : number) : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}getUnFollowedCommunities/${id}`);
    }
    ToFollow(idcom : number,iduser : number) : Observable<Object>{
      return this.http.get<number>(`${this.Url}Adduser/${idcom}/${iduser}`);
    }
    ToUnFollow(idcom : number, iduser : number) : Observable<Object>{
      return this.http.get<number>(`${this.Url}Removeuser/${idcom}/${iduser}`);
    }








}
