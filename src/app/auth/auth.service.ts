import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../entities/User';
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User;
  private username: string ;
  private authorities: string[];
  private currentUserId: number;

  private loginUrl = 'http://localhost:8090/api/auth/signin';
  private signupUrl = 'http://localhost:8090/api/auth/signup';
  private userUrl = 'http://localhost:8090/api/users';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.username = tokenStorage.getUsername();
    this.authorities = tokenStorage.getAuthorities();
    this.currentUserId = Number(tokenStorage.getId());
  }

  public get currentUserValue(): User {
    this.http.get<User>(`${this.userUrl}/getUser/${this.username}`).subscribe(data =>{
      this.currentUser = data;
    });
    return this.currentUser;
  }

  //GET ID CYRRENT USER
  public get currentUserIdValue(): number {
    console.log("userName: "+this.username)
    this.http.get<number>(`${this.userUrl}/getUserId/${this.username}`).subscribe(data =>{
      //console.log(data);
      this.currentUserId = data;
      console.log(this.currentUserId);
      return this.currentUserId;
    });
    return 0;
  }

  public get authoritie(): String {
    return this.authorities[0];
  }

  public isAuthenticated(): boolean {
    if(this.tokenStorage.getToken()){
      return true;
    }else{
      return false;
    }
  }
  attemptAuth(credentials: AuthLoginInfo): Observable<any> {
    return this.http.post(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<any> {
    return this.http.post(this.signupUrl, info, httpOptions);
  }

  logout() {
    console.log("nnn:"+ this.currentUserId )
    this.http.put(`${this.userUrl}/manageStatus/${this.currentUserId }`, httpOptions).subscribe(data =>{
      console.log("done!!")
    });
    this.tokenStorage.logout();
}
}
