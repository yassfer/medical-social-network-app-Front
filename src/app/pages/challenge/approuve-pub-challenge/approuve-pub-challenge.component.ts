import { Component, OnInit } from '@angular/core';
import { PublicationChallenge } from 'src/app/entities/PublicationChallenge';
import { User } from 'src/app/entities/user';
import { ChallengeService } from '../challenge.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-approuve-pub-challenge',
  templateUrl: './approuve-pub-challenge.component.html',
  styleUrls: ['./approuve-pub-challenge.component.scss']
})
export class ApprouvePubChallengeComponent implements OnInit {

  publications: PublicationChallenge[];
  condition: boolean;
  base64Data: any;
  user: User;
  idCurrentUser = 1;
  click = true;
  pub = true;

  constructor(private challengeService: ChallengeService, private route: ActivatedRoute,
    private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    let idC;
    this.route.queryParams
    .subscribe(params => {
      idC = params["idC"];
    }
  );
    this.reloadData(Number(idC));
  }

  reloadData(id: number) {
    this.challengeService.getPublicationByChallengeId(id).subscribe(data => {
      if (data.length === 0) {
        this.condition = true;
      } else {
        this.condition = false;
        this.publications = data;
        for (let i = 0; i < this.publications.length; i++) {
          if(this.publications[i].pieceJoints){
            for (let j = 0; j < this.publications[i].pieceJoints.length; j++) {
              if (this.publications[i].pieceJoints[j].contentType === "image/jpeg") {
                this.base64Data = this.publications[i].pieceJoints[j].data;
                this.publications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64, ' + this.base64Data);
              }
              if (this.publications[i].pieceJoints[j].contentType === "video/mp4") {
                this.base64Data = this.publications[i].pieceJoints[j].data;
                this.publications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustUrl('data:video/mp4;base64, ' + this.base64Data);
              }
              if (this.publications[i].pieceJoints[j].contentType === "application/pdf") {
                this.base64Data = this.publications[i].pieceJoints[j].data;
                this.publications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64, ' + this.base64Data);
              }
            }
            this.publications[i].NbrLike = this.publications[i].likes.length;
            this.user = this.publications[i].user;
          }
          }
      }
    });
  }
  publication() {
    this.pub = !this.pub;
  }
  deletePublicationChallenge(idPubChallenge: number) {
    this.challengeService.deletePubChallenge(idPubChallenge).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }
  approuvePublicationChallenge(idPubChallenge: number) {
    this.challengeService.approuvePubChallenge(idPubChallenge, 4).subscribe(data => {
      console.log(data);
      this.deletePublicationChallenge(idPubChallenge);
    },
      error => console.log(error));
      window.location.reload();
  }

}
