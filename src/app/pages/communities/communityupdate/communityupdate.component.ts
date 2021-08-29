import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from 'src/app/entities/Community';
import { User } from 'src/app/entities/User';
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { CommunityServiceService } from '../community-service.service';

@Component({
  selector: 'app-communityupdate',
  templateUrl: './communityupdate.component.html',
  styleUrls: ['./communityupdate.component.scss']
})
export class CommunityupdateComponent implements OnInit {

  idCurrentUser: number;
  user: User;
  base64DataP: any;

  constructor(private route: ActivatedRoute,private CommunityService: CommunityServiceService, private router: Router, private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.idCurrentUser = Number(this.tokenStorage.getId());
  }

  id : number;
  community : Community;
  submitted : boolean;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUser(this.idCurrentUser);
    this.community = new Community();
    this.CommunityService.getCommunityById(this.id).subscribe( data => {
      this.community = data;
    });
  }


  getUser(idCurrentUser: number) {
    this.CommunityService.getUserById(idCurrentUser).subscribe(data => {
      this.user = data;
      this.base64DataP = this.user.logo;
      this.user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
    },
      error => console.log(error));
  }

  changeValue(type : String){
    this.community.type=type;
  }

  savedata() {
    this.id = this.route.snapshot.params['id'];
    this.CommunityService
      .updateCommunity(this.id,this.community).subscribe({
        next :data => {
        console.log(data);
        this.community = new Community();
        this.goToUploadImage(this.id);
      },
        error : error => console.log(error)
  })}


  OnSubmit() { this.submitted = true;
    this.savedata();}

    goToUploadImage(id: number){
      console.log("id::" + id)
      this.router.navigate(['/CreateImage', { idC: id }]);
    }

}
