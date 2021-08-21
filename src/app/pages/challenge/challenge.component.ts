import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ChallengeService } from './challenge.service';
import { Challenge } from 'src/app/entities/Challenge';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-dashboard",
  templateUrl: "challenge.component.html",
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  challenges: Challenge[];
  base64Data: any;
  condition: boolean;
  currentUserId: number = 1;
  closeResult = '';
  challenge: Challenge = new Challenge();
  submitted = false;
  idChallenge: any;


  constructor(private challengeService: ChallengeService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
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


  ///create challenge
  save() {
    this.challengeService
      .createChallenge(this.challenge).subscribe(data => {
        console.log(data);
        this.idChallenge = data;
        this.challenge = new Challenge();
        this.gotoUploadImage(this.idChallenge);
      },
        error => console.log(error));
  }

  gotoUploadImage(id: number) {
    console.log("id::" + id)
    this.router.navigate(['/challenge/create/image', { idC: id }]);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
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
        }
      }

    });
  }
  onParticipateCondition(challenge: Challenge){
    if(challenge.adminChallenge.id === this.currentUserId){
      alert("can't participate in your own challenge")
    }
    else {
      this.router.navigate(['/challenge/create/publication'], {queryParams: {idC: challenge.id}});
    }
  }
  gotoCreateChallenge() {
    this.router.navigate(['/challenge/create']);
  }
  gotoCheckChallenge() {
    this.router.navigate(['/challenge/myChallenges']);
  }
}
