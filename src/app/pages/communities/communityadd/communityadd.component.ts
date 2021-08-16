import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityServiceService } from '../community-service.service';
import { Observer } from 'rxjs';

  
import { HttpClient } from '@angular/common/http';
import { Community } from 'src/app/entities/Community';

@Component({
  selector: 'app-communityadd',
  templateUrl: './communityadd.component.html',
  styleUrls: ['./communityadd.component.scss']
})
export class CommunityaddComponent implements OnInit {

  constructor(private route: ActivatedRoute,private CommunityService: CommunityServiceService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {}
  submitted = false;
  community : Community = new Community();
  idCommunity : any;
  selectedFile: File;
  message: string;
  id: number;
  
  goToCommunityList(){
    this.router.navigate(['/communities']);
  }

  changeValue(type : String){
    this.community.type=type;
  }

  savedata() {
    console.log("tessssst")
    console.log(this.community);
    this.CommunityService
      .createCommunity(this.community).subscribe({
        next :data => {
        console.log(data);
        this.idCommunity = data;
        this.community = new Community();
        this.goToUploadImage(this.idCommunity);
      },
        error : error => console.log(error)});
  }
      newCommunity(): void {
        this.submitted = false;
        this.community = new Community();
      }
      OnSubmit() { this.submitted = true; 
        this.savedata();}

        goToUploadImage(id: number){
          console.log("id::" + id)
          this.router.navigate(['/CreateImage', { idC: id }]);
        }
      
    
}
    
  




