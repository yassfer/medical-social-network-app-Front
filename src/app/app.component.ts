import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "./auth/token-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  title = "medical-social-network-app";
  private roles: string[];
  public authority: string;
 
  constructor(private tokenStorage: TokenStorageService) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMINCOMUNITY') {
          this.authority = 'ADMINCOMUNITY';
          return false;
        }
        this.authority = 'USER';
        return true;
      });
    }
  }
}
