import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Liking } from 'src/app/entities/liking';
import { PieceJoint } from 'src/app/entities/PieceJoint';
import { PublicationChallenge } from 'src/app/entities/PublicationChallenge';
import { User } from 'src/app/entities/User';
import { ChallengeService } from '../challenge.service';
@Component({
  selector: 'app-create-publication-challenge',
  templateUrl: './create-publication-challenge.component.html',
  styleUrls: ['./create-publication-challenge.component.scss']
})
export class CreatePublicationChallengeComponent implements OnInit {

  condition: boolean;
  base64Data: any;
  user: User;
  idCurrentUser: number;
  click = true;
  com = true;
  pieceJoints: PieceJoint[];
  liking: Liking = new Liking();
  Newpublication: PublicationChallenge = new PublicationChallenge();
  publica: PublicationChallenge = new PublicationChallenge();
  publications: PublicationChallenge[];
  closeResult = '';
  file: any[];
  currentUser: User;
  friends: User[];
  base64DataP: any;
  base64DataPp: any;
  idC: number;

  constructor(private challengeService: ChallengeService,
    private router: Router, private domSanitizer: DomSanitizer, private modalService: NgbModal,
    private route: ActivatedRoute, private tokenStorage: TokenStorageService) {
      this.idCurrentUser = Number(tokenStorage.getId());
     }


  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.idC = params["idC"];
    }
  );
    this.getUser(this.idCurrentUser);
    this.reloadData(this.idCurrentUser);
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
    this.challengeService.getUserById(idCurrentUser).subscribe(data => {
      this.currentUser = data;
      this.base64DataP = this.currentUser.logo;
      this.currentUser.imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
    },
      error => console.log(error));
  }

  onDeletePub(id: number) {
    this.challengeService.getPublicationByChallengeId(id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }


  onLike(idUser: number, idPub: number) {
    this.click = !this.click;
    this.challengeService.createLike(idUser, idPub).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }

  /*onDislike(idUser: number, idPub: number) {
    this.click = !this.click;
    this.challengeService.deleteLike(idUser, idPub).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }*/


  getPublicationByChallengeId(id: number){
    this.challengeService.getPublicationByChallengeId(id).subscribe(data => {

      this.publications = data;
      console.log(this.publications);
    },
      error => console.log(error));
}

reloadData(id: number) {
  this.challengeService.getPublicationByChallengeId(id).subscribe(data => {
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
      this.challengeService.imagesUploadWithoutPubId(formData).subscribe(data => {
        console.log(data.body);
        this.pieceJoints = data.body;
      },
        error => {
          console.log(error);
        });

  }


  updatePieceJoint(pubId: number, pieceJoints: PieceJoint[]) {
    console.log(pieceJoints);
    this.challengeService.updatePieceJoint(pubId, pieceJoints).subscribe(data => {
    });
  }

  onPublication() {
    this.challengeService.createPublicationChallenge(this.idC,this.idCurrentUser, this.Newpublication).subscribe(data => {
      this.publica = data;
      this.updatePieceJoint(this.publica.id, this.pieceJoints);
    });

    //window.location.reload();

  }
}
