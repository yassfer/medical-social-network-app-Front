import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  openWorkoutBot(): Observable<any> {
    return this.http.get<Intents>(`${this.baseUrl}`);
  }

  getWorkoutFirstResponse(question: string): Observable<any> {
    return this.http.get<Intents[]>(`${this.baseUrl}/problem/${question}`);
  }

  getWorkouSecondResponse(question: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload/${question}`, null);
  }

  parseTable(file, question: string) {
    console.log(file)
    const uploadImageData = new FormData();
    uploadImageData.append('file', file);
    console.log("testt3: ")
    console.log(uploadImageData.getAll("file"));
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
      })
    };

    return this.http.post(`${this.baseUrl}/upload/${question}`, uploadImageData, httpOptions)
  }
}
