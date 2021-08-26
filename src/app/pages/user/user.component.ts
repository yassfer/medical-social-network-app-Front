import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { User } from "src/app/entities/User";
import { UserService } from "./user.service";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  idCurrentUser: number;
  user: User;
  base64DataP: any;
  base64DataPp: any;

  constructor(private tokenStorage: TokenStorageService, private userService: UserService) {
    this.idCurrentUser = Number(this.tokenStorage.getId())
  }

  ngOnInit() {
    this.reloadData()
  }

  reloadData(){
    this.userService.getUserById(this.idCurrentUser).subscribe(data => {
      console.log(data);
      this.user = data;
      this.base64DataP = this.user.logo;
      this.user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
    },
      error => console.log(error));
  }
}
