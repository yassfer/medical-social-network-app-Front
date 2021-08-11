import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Comments } from "src/app/entities/Comments";
import { Liking } from "src/app/entities/liking";
import { Publication } from "src/app/entities/publication";
import { User } from "src/app/entities/user";
import { PublicationService } from "./publication.service";
import { ModalComponent } from "./modal/modal.component";

import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
  modalRef: MDBModalRef;

  condition: boolean;
  base64Data: any;
  user: User;
  comment: Comments = new Comments();
  idCurrentUser: 1;
  click=true;
  com=true;
  pub=true;
  liking: Liking = new Liking();
  
  public: Publication = new Publication();
  publications: Publication [];
  like:number=5;
  
  constructor(private publicationservice : PublicationService,
    private router: Router, private modalService: MDBModalService) { }

    openModal() {
      this.modalRef = this.modalService.show(ModalComponent)
    }
  ngOnInit() {
    this.reloadData(1);
  }

  reloadData(id: number) {
    this.publicationservice.getPublicationByUserId(id).subscribe(data => {
      if (data.length === 0) {
        this.condition = true;
      } else {
        this.condition = false;
        this.publications = data;
       for (let i = 0; i < this.publications.length; i++) {
         for(let j=0; j<this.publications[i].pieceJoints.length; j++){
            if(this.publications[i].pieceJoints[i].contentType === "image/jpeg"){
              this.base64Data = this.publications[i].pieceJoints[i].data;
              this.publications[i].pieceJoints[i].image = 'data:image/jpeg;base64,' + this.base64Data;
            }
         }
         this.publications[i].NbrLike = this.publications[i].likes.length;
         this.user= this.publications[i].user;
        }
        
      }

    });
  }

  onPublication() {
    this.publicationservice.createPub(this.public).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));      }

    onDeletePub(){
      this.publicationservice.deletePub(this.public.id).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));      
    }
 
  onComment (idUser: number, idPub: number) {
    console.log(this.comment)
    this.publicationservice.createComment(idUser, idPub, this.comment).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
  }

  onDeleteCommment () {
    this.publicationservice.deleteCom(this.comment.id).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
  }
  onLike (idUser: number, idPub: number) {
    this.click=!this.click;
    this.publicationservice.createLike(idUser, idPub).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));

  }
  onDislike () {
    this.like--;
    this.click=!this.click;
    this.publicationservice.deleteLike(this.liking.id).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
  }

  publication() {
    this.pub=!this.pub;
      }
  commenting () {
    this.com=!this.com;

  }

}
