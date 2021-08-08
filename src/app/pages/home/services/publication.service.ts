import { Injectable } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { Comment } from 'src/app/models/comment';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Liking } from 'src/app/models/liking';
@Injectable({
  providedIn: 'root'
})
export class PublicationService {


  
  private baseURL = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }
 
  getPub(): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/publication/all`);
  }
  createPub(publication: Publication): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/publication`, publication);
  }
  getPubById(id: number): Observable<Publication>{
    return this.httpClient.get<Publication>(`publication/user/${id}`);
  }
  deletePub(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/publication/${id}`);
  }
   updatePub(publication: Publication, id :number): Observable<Object>{
    return this.httpClient.patch(`${this.baseURL}/publication/${id}`, publication);
  }

  getCom(): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/comment/all`);
  }
  createCom(comment : Comment): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/comment/`, comment);
  }
  getComById(id: number): Observable<Comment>{
    return this.httpClient.get<Comment>(`${this.baseURL}/comment/${id}`);
  }
  deleteCom(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/comment/${id}`);
  }
 updateCom(comment : Comment,id: number): Observable<Object>{
    return this.httpClient.patch(`${this.baseURL}/comment/${id}`,comment);
  }

  
  getLike(): Observable<Object>{
    return this.httpClient.get(`${this.baseURL}/like/all`);
  }
  createLike(like : Liking): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/like`, like);
  }
  getLikeById(id: number): Observable<Liking>{
    return this.httpClient.get<Liking>(`${this.baseURL}/like/${id}`);
  }
  deleteLike(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/like/${id}`);
  }


}
