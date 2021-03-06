import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invitation } from 'src/app/entities/invitation';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private baseUrl = 'http://localhost:8090/invitations';
  private baseUrlUsers = 'http://localhost:8090/api';

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
    return this.http.get(`${this.baseUrl}/add/${senderId}/${receiverId}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrlUsers}/users/all`);
  }

  getMyFriends(id: number): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrlUsers}/users/getMyFriends/${id}`)
  }

  getAll(): Observable<any> {
    return this.http.get<Invitation[]>(`${this.baseUrl}/getAll`);
  }

  AcceptInvitationUser(idSender: number, idReceiver: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/acceptUser/${idSender}/${idReceiver}`);
  }
  DeleteInvitationUser(idSender: number, idReceiver: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${idSender}/${idReceiver}`)
  }
}
