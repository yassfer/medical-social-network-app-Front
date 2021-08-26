import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Community } from 'src/app/entities/Community';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {
  private Url = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  deleteCommunity(id: number): Observable<any> {
    return this.http.delete(`${this.Url}communities/delete/${id}`, { responseType: 'text' });
  }
  createCommunity(id : number ,file: FormData): Observable<any> {
    return this.http.post<Community>(`${this.Url}communities/Create/${id}`, file);}

    saveCommunity(id : number , communtiy : Community): Observable<any> {
      return this.http.put(`${this.Url}communities/save/${id}`, communtiy);}

  getCommunityList(): Observable<Community[]> {
      return this.http.get<Community[]>(`${this.Url}communities/getAll`);
    }
    getCommunityById(id: number): Observable<Community>{
      return this.http.get<Community>(`${this.Url}communities/getById/${id}`);
    }
    getCommunityByAdmin(id : number) : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}communities/getByAdmin/${id}`);
    }
    updateCommunity(id :number, community :Community ): Observable<Object>{
      return this.http.put<number>(`${this.Url}communities/update/${id}` , community)
    }
    getFollowedCommunities(id : number) : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}communities/getFollowedCommunities/${id}`);
    }
    getUnFollowedCommunities(id : number) : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}communities/getUnFollowedCommunities/${id}`);
    }
    ToFollow(idcom : number,iduser : number) : Observable<Object>{
      return this.http.get<number>(`${this.Url}communities/Adduser/${idcom}/${iduser}`);
    }
    ToUnFollow(idcom : number, iduser : number) : Observable<Object>{
      return this.http.get<number>(`${this.Url}communities/Removeuser/${idcom}/${iduser}`);
    }
    getUserById(id: number): Observable<any> {
      return this.http.get<User>(`${this.Url}api/users/${id}`);
    }








}
