import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from 'src/app/entities/Community';
import { CommunityServiceService } from '../community-service.service';

@Component({
  selector: 'app-all-communities',
  templateUrl: './all-communities.component.html',
  styleUrls: ['./all-communities.component.scss']
})
export class AllCommunitiesComponent implements OnInit {

  constructor( private router: Router,private communityService: CommunityServiceService, private route:ActivatedRoute) { }
follow :boolean =true;
communityListFollowed : Community[];
communityListUnFollowed : Community[];
community : Community;
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
  this.communityService.getFollowedCommunities().subscribe(data => {
    this.communityListFollowed = data;
    this.follow=true;

    
})}
unfollowed(){
  this.follow=false;
  this.communityService.getUnFollowedCommunities().subscribe(data => {
    this.communityListUnFollowed = data;
  console.log(data);})}

Tofollow(id :number){
  this.communityService.ToFollow(2,id).subscribe( data => {
    console.log(data)});
    window.location.reload();
}
ToUnfollow(id :number){
  this.communityService.ToUnFollow(2,id).subscribe( data => {
    console.log(data)});
    window.location.reload();
}
communitydetails(id:number){
  this.router.navigate(['/communitydetails', id]);
}
checktype(id : number){

  this.community = new Community();
  this.communityService.getCommunityById(id).subscribe( data => {
    this.community = data;
if (this.community.type == "Publique" ){
  
 this.communitydetails(id) }
 else {
  console.log("**************")
 //this.openDialog();
 alert("This community is private you should follow it");
}})
}

}
