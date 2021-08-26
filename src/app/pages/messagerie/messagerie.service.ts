import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/entities/message';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }
  setMsg(msg: Message): Observable<Object> {
    return this.http.post<number>(`${this.url}message/setMsg`, msg);
  }

  getMsgList(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}message/getAll`);
  }
  getUserList(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}api/users/getMyFriends/${id}`);
  }

  getMessageByReceiver(id: number): Observable<any> {
    return this.http.get<Message[]>(`${this.url}message/receiverId/${id}`);
  }
}
