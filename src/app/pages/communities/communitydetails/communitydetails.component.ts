import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Community } from 'src/app/entities/Community';
import { CommunityServiceService } from '../community-service.service';

@Component({
  selector: 'app-communitydetails',
  templateUrl: './communitydetails.component.html',
  styleUrls: ['./communitydetails.component.scss']
})
export class CommunitydetailsComponent implements OnInit {
  communities : Community[];
  community : Community;
  id :number;
  base64Data: any;
  nbrparticipants : number;
  idCurrentUser : number;
  testfollow : boolean;

 participants = new Set();
  constructor(private router: Router,private communityService: CommunityServiceService, private route:ActivatedRoute,private tokenStorage: TokenStorageService) {
    this.idCurrentUser = Number(tokenStorage.getId()); }

  ngOnInit(): void {
    this.displaycommunity();
  }


  displaycommunity(){

    this.id = this.route.snapshot.params['id'];

    this.community = new Community();
    this.communityService.getCommunityById(this.id).subscribe( data => {
      this.community = data;
      console.log(this.nbrparticipants);
      this.community.participants.forEach(element => {
        this.participants.add(element);
      });
      this.nbrparticipants=this.participants.size;
      this.testfollow=this.community.followed;
  });}

Tofollow(id :number){
    this.communityService.ToFollow(id,this.idCurrentUser).subscribe( data => {
      console.log(data)});
      this.community.followed=true;
      window.location.reload();}
ToUnfollow(id :number){
        this.communityService.ToUnFollow(id,this.idCurrentUser).subscribe( data => {
          console.log(data)});
          this.community.followed=true;
          window.location.reload();}


load() {
    this.communityService.getCommunityList().subscribe(data => {
      this.communities = data;
      //for (let i = 0; i < this.communities.length; i++) {
        //this.base64Data = this.challenges[i].pieceJoint;
        //this.challenges[i].image = 'data:image/jpeg;base64,' + this.base64Data;
      })
    ;
  }


  deletecommunity(id: number) {
    this.communityService.deleteCommunity(id)
      .subscribe(
        data => {
          console.log(data);
          this.load();
        },
        error => console.log(error));
  }


}
