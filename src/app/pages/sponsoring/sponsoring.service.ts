import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entreprise } from 'src/app/entities/entreprise';

@Injectable({
  providedIn: 'root'
})
export class SponsoringService {
  private baseUrl = 'http://localhost:8080/Entreprises/';

  constructor(private http: HttpClient) { }
  createEntrepriseWithPiece(id: number, file: FormData): Observable<any> {
    return this.http.post<Entreprise>(`${this.baseUrl}addEntreprise/${id}`, file);
  }

  saveEntreprise(id: number, Entreprise: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}save/${id}`, Entreprise);
  }
  getMyEntreprise(): Observable<any> {
    return this.http.get<Entreprise>(`${this.baseUrl}getMyEntreprise`);
  }
  getEntrepriseList(): Observable<any> {
    return this.http.get<Entreprise[]>(`${this.baseUrl}getAll`);
  }


}
