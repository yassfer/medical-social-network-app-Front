import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityServiceService } from '../community-service.service';
import { HttpClient } from '@angular/common/http';
import { Community } from 'src/app/entities/Community';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-communityadd',
  templateUrl: './communityadd.component.html',
  styleUrls: ['./communityadd.component.scss']
})
export class CommunityaddComponent implements OnInit {

  closeResult = '';
  submitted = false;

  constructor(private route: ActivatedRoute,private CommunityService: CommunityServiceService,
    private router: Router, private httpClient: HttpClient, private modalService: NgbModal) { }


    /////start modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  /////end modal

  ngOnInit(): void {}
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






