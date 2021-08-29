import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationChallenge } from 'src/app/entities/PublicationChallenge';
import { User } from 'src/app/entities/user';
import { ChallengeService } from '../challenge.service';

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
  idC: number;
  base64DataPp: any;

  constructor(private challengeService: ChallengeService, private route: ActivatedRoute,
    private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.idC = params["idC"];
    }
  );
    this.reloadData(Number(this.idC));
  }

  reloadData(id: number) {
    this.challengeService.getPublicationByChallengeId(id).subscribe(data => {
      this.publications = data;
      console.log(this.publications);
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
            this.base64DataPp = this.publications[i].user.logo;
            this.publications[i].user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataPp;
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
  approuvePublicationChallenge(idPubChallenge: number, publication: PublicationChallenge) {
    this.challengeService.approuvePubChallenge(idPubChallenge, 4).subscribe(data => {
      console.log(data);
     /* const idx = this.publications.indexOf(publication);
      this.publications.forEach((element,index)=>{
        if(element==publication) this.publications.splice(index,idx);
     });*/
    },
      error => console.log(error));
      window.location.reload();
  }

}
