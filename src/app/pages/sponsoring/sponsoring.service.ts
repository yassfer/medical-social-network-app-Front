import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entreprise } from 'src/app/entities/entreprise';
import { User } from 'src/app/entities/User';

@Injectable({
  providedIn: 'root'
})
export class SponsoringService {
  private baseUrl = 'http://localhost:8090/';

  constructor(private http: HttpClient) { }
  createEntrepriseWithPiece(id: number, file: FormData): Observable<any> {
    return this.http.post<Entreprise>(`${this.baseUrl}entreprise/addEntreprise/${id}`, file);
  }

  saveEntreprise(id: number, Entreprise: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}entreprise/save/${id}`, Entreprise);
  }
  getMyEntreprise(): Observable<any> {
    return this.http.get<Entreprise>(`${this.baseUrl}entreprise/getMyEntreprise`);
  }
  getEntrepriseList(): Observable<any> {
    return this.http.get<Entreprise[]>(`${this.baseUrl}entreprise/getAll`);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get<User>(`${this.baseUrl}api/users/${id}`);
  }


}
