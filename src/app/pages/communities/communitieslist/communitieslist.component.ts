import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityServiceService } from '../community-service.service';
import { Community } from 'src/app/entities/Community';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/entities/User';


@Component({
  selector: 'app-communitieslist',
  templateUrl: './communitieslist.component.html',
  styleUrls: ['./communitieslist.component.scss']
})
export class CommunitieslistComponent implements OnInit {

  communityList: Community [];
  CommunityItem : Community;
  community : Community = new Community();
  CommunityR : Community ;
  idCommunityR : number;
  base64Data: any;
  condition: boolean;
  closeResult = '';
  submitted = false;
  idCurrentUser : number;
  selectedFile: File;
  currentUser: User;
  base64DataP: any;
  base64DataPp: any;
  base64DataC: any;
  //communityItem : CommunityItem;

  constructor(private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient, private modalService: NgbModal ,private communityservice: CommunityServiceService,
    private tokenStorage: TokenStorageService) {
      this.idCurrentUser = Number(tokenStorage.getId()); }

  /*deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }*/



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



changeValue(type : String){
  this.community.type=type;
}
  communitydetails(id:number){
    //this.router.navigate(['/communitydetails', id]);
    this.router.navigate(['/communityProfile', id]);
  }
  communityupdate(id : number){
    this.router.navigate(['/communityupdate', id]);
  }
  communityadd(){
    this.router.navigate(['/communityadd']);
  }




checktype(id : number){

  this.CommunityItem = new Community();
  this.communityservice.getCommunityById(id).subscribe( data => {
    this.CommunityItem = data;
if (this.CommunityItem.type == "Publique" ){

 this.communitydetails(id) }
 else {
  console.log("**************")
 //this.openDialog();
 alert("This community is private you should follow it");
}})
}

  public onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    console.log(this.selectedFile);
    console.log("id::: " + this.idCurrentUser);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    console.log(uploadImageData);
    this.communityservice.createCommunity(this.idCurrentUser, uploadImageData).subscribe(data => {
        console.log(data);
        this.CommunityR = data;
        this.idCommunityR = this.CommunityR.id;
      },
        error => console.log(error));
  }

  save() {
    this.communityservice.saveCommunity(this.idCommunityR, this.community).subscribe(data => {
        console.log(data);
      },
        error => console.log(error));
    window.location.reload();
    console.log(this.community);
  }


  deleteCommunity(id: number){
    this.communityservice.deleteCommunity(id).subscribe( data => {
      console.log(data);
      window.location.reload();

    },
    error => console.log(error));
  }


  getUser(idCurrentUser: number) {
    this.communityservice.getUserById(idCurrentUser).subscribe(data => {
      this.currentUser = data;
      this.base64DataP = this.currentUser.logo;
      this.currentUser.imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
    },
      error => console.log(error));
  }
  load() {

    this.communityservice.getCommunityByAdmin(this.idCurrentUser).subscribe(data => {
      this.communityList = data;
      console.log(this.communityList);

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
    this.getUser(this.idCurrentUser);
    this.load();
  }




  }

