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
    },
      error => console.log(error));
  }
}
