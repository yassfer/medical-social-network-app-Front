import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityServiceService } from '../community-service.service';
import { Community} from '../community';

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
  constructor(private router: Router,private communityService: CommunityServiceService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.community = new Community();
    this.communityService.getCommunityById(this.id).subscribe( data => {
      this.community = data;
      console.log(this.community.Image)
    });
  }
  


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
  Follow(id : number){
    
    this.router.navigate(['/Communitypage', { idC: id }]);
  }


}
