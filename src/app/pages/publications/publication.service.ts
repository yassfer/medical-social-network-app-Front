import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from 'src/app/entities/Comments';
import { Liking } from 'src/app/entities/liking';
import { PieceJoint } from 'src/app/entities/PieceJoint';
import { Publication } from 'src/app/entities/publication';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {



  private baseURL = "http://localhost:8090/api/";

  constructor(private httpClient: HttpClient) { }
  getPublicationByUserId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}publication/user/${id}`);
  }
  createComment(idUser: number, idPublication: number, comment: Comments): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}comment/user/${idUser}/pub/${idPublication}`, comment);
  }
  createLike(idUser: number, idPublication: number): Observable<Liking> {
    return this.httpClient.get<Liking>(`${this.baseURL}like/${idUser}/${idPublication}`);
  }
  createPublication(idUser: number, publication: Publication): Observable<any> {
    return this.httpClient.post(`${this.baseURL}publication/${idUser}`, publication);
  }

  uploadImage(idPublication: number, file: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseURL}upload/publication/${idPublication}`, file, { observe: 'response' });
  }
  imagesUpload(idPublication: number, file: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseURL}pieceJoint/uploadPieceJoints/publication/${idPublication}`, file, { observe: 'response' });
  }

  imagesUploadWithoutPubId(file: FormData): Observable<any> {
    return this.httpClient.post<PieceJoint[]>(`${this.baseURL}pieceJoint/uploadPieceJoints`, file, { observe: 'response' });
  }


  updatePieceJoint(pubId: number, pieceJoints: PieceJoint[]): Observable<any> {
    return this.httpClient.patch(`${this.baseURL}pieceJoint/publication/${pubId}`, pieceJoints, { responseType: 'text' });
  }

  getPieceJointById(idPieceJoint: number): Observable<PieceJoint> {
    return this.httpClient.get<PieceJoint>(`${this.baseURL}pieceJoint/${idPieceJoint}`);
  }
  deleteLike(idUser: number, idPublication: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}like/user${idUser}/publication/${idPublication}`);
  }


  //************* */

  getPub(): Observable<any> {
    return this.httpClient.get<Publication[]>(`${this.baseURL}publication/all`);
  }

  getPubById(id: number): Observable<Publication> {
    return this.httpClient.get<Publication>(`publication/user/${id}`);
  }
  deletePub(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}publication/${id}`);
  }
  updatePub(publication: Publication, id: number): Observable<Object> {
    return this.httpClient.patch(`${this.baseURL}publication/${id}`, publication);
  }

  getCom(): Observable<Comments[]> {
    return this.httpClient.get<Comments[]>(`${this.baseURL}comment/api/all`);
  }

  getComById(id: number): Observable<Comments> {
    return this.httpClient.get<Comments>(`${this.baseURL}comment/${id}`);
  }
  deleteCom(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}comment/${id}`);
  }
  updateCom(comment: Comments, id: number): Observable<Object> {
    return this.httpClient.patch(`${this.baseURL}comment/${id}`, comment);
  }




  getLike(): Observable<Liking[]> {
    return this.httpClient.get<Liking[]>(`${this.baseURL}like/api/all`);
  }

  getLikeById(id: number): Observable<Liking> {
    return this.httpClient.get<Liking>(`${this.baseURL}like/${id}`);
  }

  /*********/

  getUserById(id: number): Observable<any> {
    return this.httpClient.get<User>(`${this.baseURL}users/${id}`);
  }

  getFriends(id: number): Observable<any> {
    return this.httpClient.get<User[]>(`${this.baseURL}users/getMyFriends/${id}`);
  }



}
