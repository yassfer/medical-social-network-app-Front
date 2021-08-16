import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Comments } from "src/app/entities/Comments";
import { Liking } from "src/app/entities/liking";
import { Publication } from "src/app/entities/publication";
import { User } from "src/app/entities/user";
import { PublicationService } from "./publication.service";

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {

  condition: boolean;
  base64Data: any;
  user: User;
  idCurrentUser = 1;

  click = true;
  com = true;
  pub = true;

  liking: Liking = new Liking();
  Newpublication: Publication = new Publication();
  comment: Comments = new Comments();
  publica: Publication = new Publication();

  publications: Publication[];

  constructor(private publicationservice: PublicationService,
    private router: Router, private domSanitizer: DomSanitizer) { }


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
          console.log(this.publications[i].user.id)
          for (let j = 0; j < this.publications[i].pieceJoints.length; j++) {
            if (this.publications[i].pieceJoints[j].contentType === "image/jpeg") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image= 'data:image/jpeg;base64,' + this.base64Data ;
              console.log(this.publications[i].pieceJoints[j].image);
              //this.publications[i].images.push(this.publications[i].pieceJoints[j].image);
            }
            if (this.publications[i].pieceJoints[j].contentType === "video/mp4") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustUrl('data:video/mp4;base64, ' + this.base64Data);
              //this.publications[i].images.push(this.publications[i].pieceJoints[j].image);
            }
            if (this.publications[i].pieceJoints[j].contentType === "application/pdf") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image= this.domSanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64, ' + this.base64Data);
              //this.publications[i].images.push(this.publications[i].pieceJoints[j].image);
            }
          }
          this.publications[i].NbrLike = this.publications[i].likes.length;
          this.user = this.publications[i].user;
        }
      }
    }
    );
  }
  onPublication() {
    this.publicationservice.createPublication(this.idCurrentUser, this.Newpublication).subscribe(data => {
      console.log(data);
      this.publica = data;
      this.gotoUploadImage(this.publica.id);
    });
  }
  gotoUploadImage(id: number) {
    console.log("id::" + id)
    this.router.navigate(['/publication/create/image', { idP: id }]);
  }
  onDeletePub(id: number) {
    this.publicationservice.deletePub(id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error))
  }
  onComment(idUser: number, idPub: number) {
    console.log(this.comment)
    this.publicationservice.createComment(idUser, idPub, this.comment).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }

  onDeleteCommment() {
    this.publicationservice.deleteCom(this.comment.id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  }

  onLike(idUser: number, idPub: number) {
    console.log(idUser)
    this.click = !this.click;
    this.publicationservice.createLike(idUser, idPub).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }

  onDislike(idUser: number, idPub: number) {
    this.click = !this.click;
    this.publicationservice.deleteLike(idUser, idPub).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  }

  publication() {
    this.pub = !this.pub;
  }
  commenting() {
    this.com = !this.com;
  }

}
