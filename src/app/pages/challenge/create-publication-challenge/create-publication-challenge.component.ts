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
      console.log(data);
    });
  }

  onPublication() {
    this.challengeService.createPublicationChallenge(this.idC,this.idCurrentUser, this.Newpublication).subscribe(data => {
      this.publica = data;
      this.updatePieceJoint(this.publica.id, this.pieceJoints);
    });


    this.router.navigate(['/challenge']);

    //window.location.reload();

  }
}
