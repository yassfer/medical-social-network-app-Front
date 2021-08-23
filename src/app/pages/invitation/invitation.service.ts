import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invitation } from 'src/app/entities/invitation';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private baseUrl = 'http://localhost:8090/invitations'; 

  constructor(private http: HttpClient) { }

  getAllInvitations(id: number): Observable<any> {
    return this.http.get<Invitation[]>(`${this.baseUrl}/getInvitationByUser/${id}`);
  }

  DeleteInvitation(id: number, invitation: Object): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, invitation);
  }

  AcceptInvitation(id: number, invitation: Object): Observable<any> {
    return this.http.post<number>(`${this.baseUrl}/accept/${id}`, invitation);
  }
}
