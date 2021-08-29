import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Community } from 'src/app/entities/Community';
import { User } from 'src/app/entities/User';
import { Comments } from 'src/app/entities/Comments';
import { Liking } from 'src/app/entities/liking';
import { PieceJoint } from 'src/app/entities/PieceJoint';
import { PublicationCommunity } from 'src/app/entities/PublicationCommunity';

@Injectable({
  providedIn: 'root'
})
export class CommunityServiceService {
  private Url = 'http://localhost:8090/';

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


    //////////////////

    createComment(idUser: number, idPublication: number, comment: Comments): Observable<Object> {
      return this.http.post(`${this.Url}api/comment/user/${idUser}/pubCommunity/${idPublication}`, comment);
    }
    createLike(idUser: number, idPublication: number): Observable<Liking> {
      return this.http.get<Liking>(`${this.Url}api/like/likeCommunity/${idUser}/${idPublication}`);
    }
    createPublication(idUser: number, communityId: number, publication: PublicationCommunity): Observable<any> {
      return this.http.post(`${this.Url}api/publicationCommunity/${communityId}/${idUser}`, publication);
    }


    imagesUploadWithoutPubId(file: FormData): Observable<any> {
      return this.http.post<PieceJoint[]>(`${this.Url}api/pieceJoint/uploadPieceJoints`, file, { observe: 'response' });
    }


    updatePieceJoint(pubId: number, pieceJoints: PieceJoint[]): Observable<any> {
      return this.http.patch(`${this.Url}api/pieceJoint/publicationCommunity/${pubId}`, pieceJoints, { responseType: 'text' });
    }

    getPieceJointById(idPieceJoint: number): Observable<PieceJoint> {
      return this.http.get<PieceJoint>(`${this.Url}api/pieceJoint/${idPieceJoint}`);
    }
    deleteLike(id: number): Observable<Object> {
      return this.http.delete(`${this.Url}api/like/${id}`);
    }


    //************* */

    getPub(): Observable<any> {
      return this.http.get<PublicationCommunity[]>(`${this.Url}api/publicationCommunity/all`);
    }

    getPubById(id: number): Observable<PublicationCommunity> {
      return this.http.get<PublicationCommunity>(`${this.Url}api/publicationCommunity/${id}`);
    }
    deletePub(id: number): Observable<any> {
      return this.http.delete(`${this.Url}api/publicationCommunity/${id}`);
    }

    getCom(): Observable<Comments[]> {
      return this.http.get<Comments[]>(`${this.Url}api/comment/all`);
    }

    getComById(id: number): Observable<Comments> {
      return this.http.get<Comments>(`${this.Url}api/comment/${id}`);
    }
    deleteCom(id: number): Observable<Object> {
      return this.http.delete(`${this.Url}api/comment/${id}`);
    }
    updateCom(comment: Comments, id: number): Observable<Object> {
      return this.http.patch(`${this.Url}api/comment/${id}`, comment);
    }


    getPubByCommunityId(id: number): Observable<PublicationCommunity[]> {
      return this.http.get<PublicationCommunity[]>(`${this.Url}api/publicationCommunity/community/${id}`);
    }


    getLike(): Observable<Liking[]> {
      return this.http.get<Liking[]>(`${this.Url}api/like/all`);
    }

    getLikeById(id: number): Observable<Liking> {
      return this.http.get<Liking>(`${this.Url}api/like/${id}`);
    }

  //////////
  getAllPublication(): Observable<any> {
    return this.http.get<PublicationCommunity[]>(`${this.Url}api/publicationCommunity/getAllByDate`);
  }








}
