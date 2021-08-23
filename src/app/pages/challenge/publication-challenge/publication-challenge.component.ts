import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Liking } from 'src/app/entities/liking';
import { PublicationChallenge } from 'src/app/entities/PublicationChallenge';
import { User } from 'src/app/entities/user';
import { ChallengeService } from '../challenge.service';
import { TokenStorageService } from "src/app/auth/token-storage.service";

@Component({
  selector: 'app-publication-challenge',
  templateUrl: './publication-challenge.component.html',
  styleUrls: ['./publication-challenge.component.scss']
})
export class PublicationChallengeComponent implements OnInit {
  condition: boolean;
  base64Data: any;
  user: User;
  idCurrentUser: number;
  click = true;
  pub = true;
  liking: Liking = new Liking();
  ApprouvedPublications: PublicationChallenge[];
  like;

  constructor(private challengeService: ChallengeService, private route: ActivatedRoute,
    private router: Router, private domSanitizer: DomSanitizer, private tokenStorage: TokenStorageService) {
      this.idCurrentUser = Number(tokenStorage.getId());
     }


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
    this.challengeService.getApprouvedPublicationByChallengeId(id).subscribe(data => {
      console.log(data);
      if (data.length === 0) {
        this.condition = true;
      } else {
        this.condition = false;
        this.ApprouvedPublications = data;
        for (let i = 0; i < this.ApprouvedPublications.length; i++) {
          for (let j = 0; j < this.ApprouvedPublications[i].pieceJoints.length; j++) {
            if (this.ApprouvedPublications[i].pieceJoints[j].contentType === "image/jpeg") {
              this.base64Data = this.ApprouvedPublications[i].pieceJoints[j].data;
              this.ApprouvedPublications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64, ' + this.base64Data);
            }
            if (this.ApprouvedPublications[i].pieceJoints[j].contentType === "video/mp4") {
              this.base64Data = this.ApprouvedPublications[i].pieceJoints[j].data;
              this.ApprouvedPublications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustUrl('data:video/mp4;base64, ' + this.base64Data);
            }
            if (this.ApprouvedPublications[i].pieceJoints[j].contentType === "application/pdf") {
              this.base64Data = this.ApprouvedPublications[i].pieceJoints[j].data;
              this.ApprouvedPublications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64, ' + this.base64Data);
            }
          }
          this.ApprouvedPublications[i].NbrLike = this.ApprouvedPublications[i].likes.length;
          this.user = this.ApprouvedPublications[i].user;
        }
      }
    },
    error => console.log(error));
  }
  onLike(idUser: number, idPub: number) {
    this.click = !this.click;
    this.challengeService.createLike(idUser, idPub).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }
  publication() {
    this.pub = !this.pub;
  }
  /*onDeletePub() {
    this.publicationservice.deletePub(this.Newpublication.id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  }*/
  /*onDislike() {
    this.like--;
    this.click = !this.click;
    this.publicationservice.deleteLike(this.liking.id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  }*/
}
