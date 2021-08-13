import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationChallenge } from 'src/app/entities/PublicationChallenge';
import { ChallengeService } from '../challenge.service';
@Component({
  selector: 'app-create-publication-challenge',
  templateUrl: './create-publication-challenge.component.html',
  styleUrls: ['./create-publication-challenge.component.scss']
})
export class CreatePublicationChallengeComponent implements OnInit {

  pub = true;
  idCurrentUser = 1;
  publicationChallenge: PublicationChallenge = new PublicationChallenge();
  constructor(private challengeService: ChallengeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onPublication() {
    let idChallenge;
    this.route.queryParams
    .subscribe(params => {
      idChallenge = params["idC"];
    }
  );
    this.challengeService.createPublicationChallenge(idChallenge, this.idCurrentUser, this.publicationChallenge).subscribe(data => {
      console.log(data);
      this.publicationChallenge = data;
      this.gotoUploadImage(this.publicationChallenge.id);
    },
      error => console.log(error));
  }
  gotoUploadImage(id: number) {
    console.log("id::" + id)
    this.router.navigate(['/publication/create/image', { idP: id }]);
  }

  publication() {
    this.pub = !this.pub;
  }
}
