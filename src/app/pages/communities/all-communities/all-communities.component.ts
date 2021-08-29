import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Community } from 'src/app/entities/Community';
import { User } from 'src/app/entities/User';
import { CommunityServiceService } from '../community-service.service';

@Component({
  selector: 'app-all-communities',
  templateUrl: './all-communities.component.html',
  styleUrls: ['./all-communities.component.scss']
})
export class AllCommunitiesComponent implements OnInit {

  constructor(private modalService: NgbModal , private router: Router,private communityService: CommunityServiceService, private route:ActivatedRoute,private tokenStorage: TokenStorageService) {
    this.idCurrentUser = Number(tokenStorage.getId()); }
    idCurrentUser : number;
follow :boolean =true;
communityListFollowed : Community[];
communityListUnFollowed : Community[];
community : Community;
Community : Community;
Comm : Community;
com = new Community();
id : number;
nbrparticipants : number;
participants = new Set();
map = new Map<number, Community>();
objet :any;


  ngOnInit(): void {
    this.followed ();
  }

followed () {
  this.communityService.getFollowedCommunities(this.idCurrentUser).subscribe(data => {
    this.communityListFollowed = data;
    console.log("communityListFollowed");
    console.log(this.communityListFollowed);
    this.follow=true;


})}
unfollowed(){
  this.follow=false;
  this.communityService.getUnFollowedCommunities(this.idCurrentUser).subscribe(data => {
    this.communityListUnFollowed = data;
    console.log(this.communityListFollowed);
})}

Tofollow(id :number){
  this.communityService.ToFollow(id,this.idCurrentUser).subscribe( data => {
    console.log(data)});
    this.communityService.getCommunityById(id).subscribe( data => {
      this.community = data;
      });
      this.community.followed =true;
    window.location.reload();
    this.router.navigate(['/community-profile', this.community.id]);
}
ToUnfollow(id :number){
  this.communityService.ToUnFollow(id,this.idCurrentUser).subscribe( data => {
    console.log(data)});
    this.communityService.getCommunityById(id).subscribe( data => {
      this.community = data;
      });
      this.community.followed =false;
    window.location.reload();
}
communitydetails(id:number){
  this.router.navigate(['/communitydetails', id]);
}
communityProfile(id:number){
  this.router.navigate(['/community-profile', id]);
}
checktype(id : number){

  this.community = new Community();
  this.communityService.getCommunityById(id).subscribe( data => {
    this.community = data;
if (this.community.type === "Publique" ){

 this.communityProfile(id) }
 else {
  for (const participant of Array.from(this.community.participants.values()))

     {if (participant.id === this.idCurrentUser){
      this.communityProfile(id)
     }

      else{
        alert("This community is private you should follow it");
      }

      }
}})
}
}
