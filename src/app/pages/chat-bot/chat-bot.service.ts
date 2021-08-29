import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fitbotty } from 'src/app/entities/Fitbotty';
import { Intents } from 'src/app/entities/intents';
import { Participant } from 'src/app/entities/Participant';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private baseUrl = 'http://localhost:5000';
  private baseUrlS = 'http://localhost:5100';
  private baseUrlV = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  getChatResponse(question: string): Observable<any> {
    return this.http.get<Intents[]>(`${this.baseUrlS}/healthBot/${question}`);
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

  getWorkoutVideo(id: number): Observable<any> {
    return this.http.get<Fitbotty>(`${this.baseUrlV}/api/workoutBot/video/${id}`);
  }

  getWorkoutVideoS(title: string): Observable<any> {
    return this.http.get<Fitbotty>(`${this.baseUrlV}/api/workoutBot/getFit/${title}`);
  }

  checkDiet(participant: Participant): Observable<any> {
    return this.http.post(`${this.baseUrl}dietBot/`, participant);
  }
}
