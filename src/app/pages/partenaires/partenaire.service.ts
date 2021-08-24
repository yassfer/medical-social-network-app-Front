import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partenaire } from 'src/app/entities/Partenaire';

@Injectable({
  providedIn: 'root'
})
export class PartenaireService {
  private url = 'http://localhost:8090/entreprise/';

  constructor(private http: HttpClient) { }

  getPartnerList(): Observable<Partenaire[]> {
    return this.http.get<Partenaire[]>(`${this.url}getAll`);
  }


  deletePartner(id: number): Observable<Object> {
    console.log("imaaaaaaaa");
    return this.http.delete(`${this.url}${id}`);
  }
}
