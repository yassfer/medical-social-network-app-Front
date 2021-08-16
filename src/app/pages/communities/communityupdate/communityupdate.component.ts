import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from 'src/app/entities/Community';

import { CommunityServiceService } from '../community-service.service';

@Component({
  selector: 'app-communityupdate',
  templateUrl: './communityupdate.component.html',
  styleUrls: ['./communityupdate.component.scss']
})
export class CommunityupdateComponent implements OnInit {

  constructor(private route: ActivatedRoute,private CommunityService: CommunityServiceService, private router: Router, private httpClient: HttpClient) { }

  id : number;
  community : Community;
  submitted : boolean;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.community = new Community();
    this.CommunityService.getCommunityById(this.id).subscribe( data => {
      this.community = data;
    });
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
