import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityServiceService } from '../community-service.service';
import { Community } from '../community';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-communitieslist',
  templateUrl: './communitieslist.component.html',
  styleUrls: ['./communitieslist.component.scss']
})
export class CommunitieslistComponent implements OnInit {

  communityList: Community [];
  community : Community;
  base64Data: any;
  condition: boolean;
  
  //communityItem : CommunityItem;

  constructor(public dialog: MatDialog, private communityservice: CommunityServiceService, private router: Router) {
  }

  /*deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })*/
  communitydetails(id:number){
    this.router.navigate(['/communitydetails', id]);
  }
  communityupdate(id : number){
    this.router.navigate(['/communityupdate', id]);
  }
  communityadd(){
    this.router.navigate(['/communityadd']);
  }
checktype(id : number){

  this.community = new Community();
  this.communityservice.getCommunityById(id).subscribe( data => {
    this.community = data;
if (this.community.type == "Publique" ){
  
 this.communitydetails(id) }
 else {
  console.log("**************")
 //this.openDialog();
 alert("This community is private you should follow it");
}})
}





  load() {
    
    this.communityservice.getCommunityByAdmin().subscribe(data => {
      this.communityList = data;
    
      if (this.communityList.length === 0) {
        this.condition = true;
      } else {
        this.condition = false;
      /*for (let i = 0; i < this.communityList.length; i++) {

     
        this.base64Data = this.communityList[i].Image;
        console.log(this.communityList[i].Image);
        this.communityList[i].piecejointe = 'data:image/jpeg;base64,' + this.base64Data;
      }*/}}
    );
  }

  ngOnInit(): void { 
    this.load();
  }


  

  }
