import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/entities/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = 'http://localhost:8080/notification';

  constructor(private http: HttpClient) {   }

    createNotif(notif : Notification): Observable<Object> {
      return this.http.post(`${this.url}/create`,notif);
    }
    getNotifList(): Observable<Notification[]> {
      return this.http.get<Notification[]>(`${this.url}/getAll`);
    }

    deleteNotif(id: number): Observable<Object> {
      return this.http.delete(`${this.url}/${id}`);
    }

}
