import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challenge } from 'src/app/entities/Challenge';
import { PublicationChallenge } from 'src/app/entities/PublicationChallenge';
import { Liking } from 'src/app/entities/liking';
@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private baseUrl = 'http://localhost:8090/';

  constructor(private http: HttpClient) { }

  // Challenge Services

  saveChallenge(id: number, challenge: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}challange/save/${id}`, challenge);
  }

  createChallengeWithPiece(id: number, file: FormData): Observable<any> {
    return this.http.post<Challenge>(`${this.baseUrl}challange/addChallenge/${id}`, file);
  }

  deleteChallenge(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}challange/delete/${id}`, { responseType: 'text' });
  }

  getChallengesList(): Observable<any> {
    return this.http.get<Challenge[]>(`${this.baseUrl}challange/getAll`);
  }

  getMyChallengesList(): Observable<any> {
    return this.http.get<Challenge[]>(`${this.baseUrl}challange/getMyChallenges`);
  }

  /*updateChallenge(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }*/

  /* getChallenge(id: number): Observable<any> {
     return this.http.get(`${this.baseUrl}/${id}`);
   }*/

   // Challenge Publication Service

   getPublicationByChallengeId(id: number): Observable<any> {
    return this.http.get<PublicationChallenge[]>(`${this.baseUrl}api/publicationChallenge/notApprouved/${id}`);
  }
  getApprouvedPublicationByChallengeId(id: number): Observable<any> {
    return this.http.get<PublicationChallenge[]>(`${this.baseUrl}api/publicationChallenge/approuved/challenge/${id}`);
  }

  imagesUploadWithoutPubId(file: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}api/pieceJoint/uploadPieceJoints`, file, { observe: 'response' });
  }

  createLike(idUser: number, idPublication: number): Observable<Liking> {
    return this.http.get<Liking>(`${this.baseUrl}api/like/likeChallenge/${idUser}/${idPublication}`);
  }
  createPublicationChallenge(challengeId: number, userId: number, publication: PublicationChallenge): Observable<any> {
    return this.http.post(`${this.baseUrl}api/publicationChallenge/${challengeId}/${userId}`, publication);
  }
  deletePubChallenge(pubChallengeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}api/publicationChallenge/${pubChallengeId}`, { responseType: 'text' });
  }
  approuvePubChallenge(pubChallengeId: number, userId:number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}api/publicationChallenge/approuve/${pubChallengeId}/${userId}`);
  }

}
