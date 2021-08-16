import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intents } from 'src/app/entities/intents';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private baseUrl = 'http://localhost:5000/chat'; 

  constructor(private http: HttpClient) { }
  
  getChatResponse(question: string): Observable<any> {
    return this.http.get<Intents[]>(`${this.baseUrl}/${question}`);
  }
}
