import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Community } from 'src/app/entities/Community';

@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {
  private Url = 'http://localhost:8090/communities';

  constructor(private http: HttpClient) { }
  deleteCommunity(id: number): Observable<any> {
    return this.http.delete(`${this.Url}/delete/${id}`, { responseType: 'text' });
  }
  createCommunity(communityItem: Community): Observable<Object> {
    return this.http.post<number>(`${this.Url}/Create/2`, communityItem);}

  getCommunityList(): Observable<Community[]> {
      return this.http.get<Community[]>(`${this.Url}/getAll`);
    }
    getCommunityById(id: number): Observable<Community>{
      return this.http.get<Community>(`${this.Url}/getById/${id}`);
    }
    getCommunityByAdmin() : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}/getByAdmin/2`);
    }
    updateCommunity(id :number, community :Community ): Observable<Object>{
      return this.http.put<number>(`${this.Url}/update/${id}` , community)
    }
    getFollowedCommunities() : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}/getFollowedCommunities/2`);
    }
    getUnFollowedCommunities() : Observable<Community[]>{
      return this.http.get<Community[]>(`${this.Url}/getUnFollowedCommunities/2`);
    }
    ToFollow(iduser : number , idcom : number) : Observable<Object>{
      return this.http.get<number>(`${this.Url}/Adduser/${iduser}/${idcom}`);
    }
    ToUnFollow(iduser : number , idcom : number) : Observable<Object>{
      return this.http.get<number>(`${this.Url}/Removeuser/${iduser}/${idcom}`);
    }








}
