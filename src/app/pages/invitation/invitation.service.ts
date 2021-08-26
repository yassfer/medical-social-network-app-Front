import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invitation } from 'src/app/entities/invitation';
import { User } from 'medical-social-network-app-Front/src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private baseUrl = 'http://localhost:8090/invitations';
  private baseUrlUsers = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllInvitations(id: number): Observable<any> {
    return this.http.get<Invitation[]>(`${this.baseUrl}/getInvitationByUser/${id}`);
  }

  DeleteInvitation(invitationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${invitationId}`);
  }

  AcceptInvitation(id: number, invitationId: number): Observable<any> {
    return this.http.get<number>(`${this.baseUrl}/accept/${id}/${invitationId}`);
  }

  AddInvitation(senderId: number, receiverId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${senderId}/${receiverId}`, Invitation);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrlUsers}/users/all`);
  }

  getMyFriends(id: number): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrlUsers}/users/getMyFriends/${id}`)
  }

  getBySender(id: number): Observable<any> {
    return this.http.get<Invitation[]>(`${this.baseUrl}/getBySender/${id}`);
  }

}
