import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { User } from "src/app/entities/User";
import { Liking } from "src/app/entities/liking";
import { Publication } from "src/app/entities/publication";
import { Comments } from "src/app/entities/Comments";
import { PublicationService } from "../publications/publication.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PieceJoint } from "src/app/entities/PieceJoint";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";

@Component({
  selector: "app-publication",
  templateUrl: "publication.component.html",
  styleUrls: ["./publication.component.css"]
})
export class PublicationComponent implements OnInit {

  condition: boolean;
  base64Data: any;
  user: User;
  idCurrentUser: number;
  click = true;
  com = true;
  pieceJoints: PieceJoint[];
  liking: Liking = new Liking();
  Newpublication: Publication = new Publication();
  comment: Comments = new Comments();
  publica: Publication = new Publication();
  publications: Publication[];
  closeResult = '';
  file: any[];


  constructor(private publicationservice: PublicationService,
    private router: Router, private domSanitizer: DomSanitizer, private modalService: NgbModal,
    private route: ActivatedRoute, private tokenStorage: TokenStorageService) {
      this.idCurrentUser = Number(tokenStorage.getId());
     }


  ngOnInit() {
    this.reloadData(this.idCurrentUser);
    console.log("ffff:: "+this.idCurrentUser);
  }


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
            }
            if (this.publications[i].pieceJoints[j].contentType === "video/mp4") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustUrl('data:video/mp4;base64, ' + this.base64Data);
            }
            if (this.publications[i].pieceJoints[j].contentType === "application/pdf") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image= this.domSanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64, ' + this.base64Data);
            }
          }
          this.publications[i].NbrLike = this.publications[i].likes.length;
          this.user = this.publications[i].user;
        }
      }
    }
    );
  }

  /*gotoUploadImage() {
    this.router.navigate(['/publication/create/image']);
  }*/
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
  commenting() {
    this.com = !this.com;
  }



  //////////////////upload files
  onFileSelected(event: { target: { files: any[]; }; }){
    this.file = event.target.files;
  }
  onUpload() {
      let formData = new FormData();
      for(var i =0; i< this.file.length ; i++){
        formData.append("pieceJoints", this.file[i], this.file[i].name);
      }
      //let f = formData.getAll('pieceJoints');
      this.publicationservice.imagesUploadWithoutPubId(formData).subscribe(data => {
        console.log(data.body);
        this.pieceJoints = data.body;
      },
        error => {
          console.log(error);
        });
        this.gotoList();
  }


  gotoList() {
    this.router.navigate(['/publications']);
  }

  updatePieceJoint(pubId: number, pieceJoints: PieceJoint[]) {
    console.log(pieceJoints);
    this.publicationservice.updatePieceJoint(pubId, pieceJoints).subscribe(data => {
      console.log("data");
      console.log(data);
    });
  }

  onPublication() {
    this.publicationservice.createPublication(this.idCurrentUser, this.Newpublication).subscribe(data => {
      console.log(data);
      this.publica = data;
      console.log("onee: "+this.pieceJoints)
      this.updatePieceJoint(this.publica.id, this.pieceJoints);
    });
  }


}
