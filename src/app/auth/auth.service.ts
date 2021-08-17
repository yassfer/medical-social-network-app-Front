import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8090/api/auth/signin';
  private signupUrl = 'http://localhost:8090/api/auth/signup';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<any> {
    return this.http.post(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<any> {
    return this.http.post(this.signupUrl, info, httpOptions);
  }
}
