import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Liking } from 'src/app/entities/liking';
import { Publication } from 'src/app/entities/publication';
import { PublicationChallenge } from 'src/app/entities/PublicationChallenge';
import { User } from 'src/app/entities/user';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-publication-challenge',
  templateUrl: './publication-challenge.component.html',
  styleUrls: ['./publication-challenge.component.scss']
})
export class PublicationChallengeComponent implements OnInit {
  modalRef: MDBModalRef;

  condition: boolean;
  base64Data: any;
  user: User;
  idCurrentUser = 1;
  public videoList;
  public playerSrc: SafeResourceUrl | String = '';

  click = true;
  pub = true;
  liking: Liking = new Liking();

  publications: PublicationChallenge[];
  like: number = 5;

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
          for (let j = 0; j < this.publications[i].pieceJoints.length; j++) {
            if (this.publications[i].pieceJoints[j].contentType === "image/jpeg") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image2 = 'data:image/jpeg;base64,' + this.base64Data;
            }
            if (this.publications[i].pieceJoints[j].contentType === "video/mp4") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image2 = this.domSanitizer.bypassSecurityTrustUrl('data:video/mp4;base64, ' + this.base64Data);
            }
            if (this.publications[i].pieceJoints[j].contentType === "application/pdf") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image2 = this.domSanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64, ' + this.base64Data);
            }
          }
          this.publications[i].NbrLike = this.publications[i].likes.length;
          this.user = this.publications[i].user;
        }
      }
    });
  }

  /*onDeletePub() {
    this.publicationservice.deletePub(this.Newpublication.id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  }*/

  onLike(idUser: number, idPub: number) {
    this.click = !this.click;
    this.challengeService.createLike(idUser, idPub).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }

  /*onDislike() {
    this.like--;
    this.click = !this.click;
    this.publicationservice.deleteLike(this.liking.id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  }*/

  publication() {
    this.pub = !this.pub;
  }
}
