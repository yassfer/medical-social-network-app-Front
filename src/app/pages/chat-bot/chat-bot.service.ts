import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intents } from 'src/app/entities/intents';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getChatResponse(question: string): Observable<any> {
    return this.http.get<Intents[]>(`${this.baseUrl}/healthBot/${question}`);
  }

  openWorkoutBot(): Observable<any> {
    return this.http.get<Intents>(`${this.baseUrl}/workoutBot`);
  }

  getWorkoutFirstResponse(question: string): Observable<any> {
    return this.http.get<Intents[]>(`${this.baseUrl}/workoutBot/problem/${question}`);
  }

  getWorkouSecondResponse(question: string, uploadImageData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/workoutBot/upload/${question}`, uploadImageData);
  }
}
