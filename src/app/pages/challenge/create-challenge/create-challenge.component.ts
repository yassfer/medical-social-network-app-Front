import { Component, OnInit } from '@angular/core';
import { Challenge } from 'src/app/entities/Challenge';
import { ChallengeService } from '../challenge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss']
})

export class CreateChallengeComponent implements OnInit {

  challenge: Challenge = new Challenge();
  submitted = false;
  idChallenge: any;

  constructor(private challengeService: ChallengeService,
    private router: Router) { }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.challenge = new Challenge();
  }

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

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoUploadImage(id: number) {
    console.log("id::" + id)
    this.router.navigate(['/challenge/create/image', { idC: id }]);
  }

}
