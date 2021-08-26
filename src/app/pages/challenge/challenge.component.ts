import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ChallengeService } from './challenge.service';
import { Challenge } from 'src/app/entities/Challenge';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { User } from "src/app/entities/User";

@Component({
  selector: "app-dashboard",
  templateUrl: "challenge.component.html",
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  selectedFile: File;
  challengeR: Challenge;
  idChallengeR: number;
  challenge: Challenge = new Challenge();
  idCurrentUser: number;

  challenges: Challenge[];
  base64Data: any;
  base64DataP: any;
  base64DataC: any;
  condition: boolean;
  currentUserId: number = 1;
  closeResult = '';
  currentUser: User;

  submitted = false;
  idChallenge: any;


  constructor(private challengeService: ChallengeService, private router: Router, private modalService: NgbModal,
    private tokenStorage: TokenStorageService) {
    this.idCurrentUser = Number(this.tokenStorage.getId());
  }

  ngOnInit(): void {
    this.reloadData();
    this.challengeService.getUserById(this.idCurrentUser).subscribe(data => {
    this.currentUser = data;
    console.log("name")
    console.log(this.currentUser.username)

    console.log("Logo")
    console.log(this.currentUser.imageProfile)
    this.base64DataP = this.currentUser.logo;
    this.currentUser.imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
    console.log(this.currentUser.imageProfile)
    });
  }

  /////start modal
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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


  ///create challenge
  public onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.challengeService
      .createChallengeWithPiece(this.idCurrentUser, uploadImageData).subscribe(data => {
        console.log(data);
        this.challengeR = data;
        this.idChallengeR = this.challengeR.id;
      },
        error => console.log(error));
  }
  save() {
    this.challengeService
      .saveChallenge(this.idChallengeR, this.challenge).subscribe(data => {
        console.log(data);
      },
        error => console.log(error));
    window.location.reload();
  }
  ///end create challenge

  reloadData() {
    this.challengeService.getChallengesList().subscribe(data => {
      this.challenges = data;
      if (this.challenges.length === 0) {
        this.condition = true;
      } else {
        this.condition = false;
        for (let i = 0; i < this.challenges.length; i++) {
          this.base64Data = this.challenges[i].pieceJoint;
          this.challenges[i].image = 'data:image/jpeg;base64,' + this.base64Data;
          this.base64DataC = this.challenges[i].adminChallenge.logo;
          this.challenges[i].adminChallenge.imageProfile = 'data:image/jpeg;base64,' + this.base64DataC;
          this.challenges[i].NbParticipant = this.challenges[i].publicationChallenge.length;
        }

      }

    });
  }
  onParticipateCondition(challenge: Challenge) {
    if (!(challenge.adminChallenge.id === this.currentUserId)) {
      alert("can't participate in your own challenge")
    }
    else {
      this.router.navigate(['/challenge/create/publication'], { queryParams: { idC: challenge.id } });
    }
  }

  gotoCheckChallenge() {
    this.router.navigate(['challenge/myChallenges']);
  }
}
