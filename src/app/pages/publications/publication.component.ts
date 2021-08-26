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
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { InvitationService } from "../invitation/invitation.service";

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
  currentUser: User;
  friends: User[];
  base64DataP: any;
  base64DataPp: any;
  base64DataC: any;
  constructor(private publicationservice: PublicationService,private invitationService: InvitationService,
    private router: Router, private domSanitizer: DomSanitizer, private modalService: NgbModal,
    private route: ActivatedRoute, private tokenStorage: TokenStorageService) {
      this.idCurrentUser = Number(tokenStorage.getId());
     }


  ngOnInit() {
    this.getUser(this.idCurrentUser);
    this.getMyFriends();
    this.reloadData();
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

  getUser(idCurrentUser: number) {
    this.publicationservice.getUserById(idCurrentUser).subscribe(data => {
      this.currentUser = data;
      this.base64DataP = this.currentUser.logo;
      this.currentUser.imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
    },
      error => console.log(error));
  }

  onDeletePub(id: number) {
    this.publicationservice.deletePub(id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }
  onComment(idUser: number, idPub: number) {
    console.log(this.comment)
    this.publicationservice.createComment(idUser, idPub, this.comment).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }

  onDeleteCommment(id:number) {
    this.publicationservice.deleteCom(id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }

  onLike(idUser: number, idPub: number) {
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
      window.location.reload();
  }
  commenting() {
    this.com = !this.com;
  }


  getPublicationByUserId(id: number){
    this.publicationservice.getPublicationByUserId(id).subscribe(data => {

      this.publications = data;
      console.log(this.publications);
    },
      error => console.log(error));
}

reloadData() {
  this.publicationservice.getAllPublication().subscribe(data => {
    if (data.length === 0) {
      this.condition = true;
    } else {
      this.condition = false;
      this.publications = data;

      for (let i = 0; i < this.publications.length; i++) {
        for (let j = 0; j < this.publications[i].pieceJoints.length; j++) {
          if (this.publications[i].pieceJoints[j].contentType === "image/jpeg") {
            this.base64Data = this.publications[i].pieceJoints[j].data;
            this.publications[i].pieceJoints[j].image= 'data:image/jpeg;base64,' + this.base64Data ;
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
        this.base64DataPp = this.publications[i].user.logo;
        this.publications[i].user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataPp;
        this.publications[i].NbrLike = this.publications[i].likes.length;
        this.user = this.publications[i].user;
      }
      for(let m=0; m<this.publications.length; m++){
        for(let n=0; n<this.publications[m].comments.length; n++){
          this.base64DataC = this.publications[m].comments[n].user.logo;
          this.publications[m].comments[n].user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataC ;
        }
      }
    }
  }
  );
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

    //window.location.reload();

  }



  getMyFriends() {
    this.publicationservice.getFriends(this.idCurrentUser).subscribe(data => {
      console.log(data);
      this.friends = data;
      console.log(this.friends)
    },
    error => {
      console.log(error);
    });

  }


  onFollow(senderId: number, receiverId: number) {
    this.invitationService.AddInvitation(senderId, receiverId).subscribe(data => {
      console.log(data);
    },
    error => {
      console.log(error);
    });

  }


}
