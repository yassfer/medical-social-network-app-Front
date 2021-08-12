import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityServiceService } from '../community-service.service';
import { Community } from '../community';

@Component({
  selector: 'app-communitieslist',
  templateUrl: './communitieslist.component.html',
  styleUrls: ['./communitieslist.component.scss']
})
export class CommunitieslistComponent implements OnInit {

  communityList: Community [];
  base64Data: any;
  condition: boolean;
  //communityItem : CommunityItem;

  constructor(private communityservice: CommunityServiceService, private router: Router) {
  }

  /*deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })*/
  communitydetails(id:number){
    this.router.navigate(['/communitydetails', id]);
  }
  communityadd(){
    this.router.navigate(['/communityadd']);
  }


  load() {
    
    this.communityservice.getCommunityList().subscribe(data => {
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

  GetCommynityByAdmin() {
    this.communityservice.getCommunityByAdmin().subscribe(data => {
      this.communityList = data;
      for (let i = 0; i < this.communityList.length; i++) {
        this.base64Data = this.communityList[i].Image;
        this.communityList[i].piecejointe = 'data:image/jpeg;base64,' + this.base64Data;
      }}
    );
  }

  ngOnInit(): void { 
    this.load();
  }


  

  }
