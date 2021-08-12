import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityServiceService } from '../community-service.service';
import { Community} from '../community';

@Component({
  selector: 'app-communitypage',
  templateUrl: './communitypage.component.html',
  styleUrls: ['./communitypage.component.scss']
})
export class CommunitypageComponent implements OnInit {
  communities : Community[];
  community : Community;
  id :number;
  constructor(private router: Router,private communityService: CommunityServiceService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.community = new Community();
    this.communityService.getCommunityById(this.id).subscribe( data => {
      this.community = data;
      console.log(this.community.Image)
    });
  }
  }


