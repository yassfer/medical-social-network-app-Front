import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from 'src/app/entities/Challenge';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-check-my-challenge',
  templateUrl: './check-my-challenge.component.html',
  styleUrls: ['./check-my-challenge.component.scss']
})
export class CheckMyChallengeComponent implements OnInit {

  challenges: Challenge[];
  base64Data: any;
  condition: boolean;

  constructor(private challengeService: ChallengeService, private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.challengeService.getMyChallengesList().subscribe(data => {
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

  deleteChallenge(id: number) {
    this.challengeService.deleteChallenge(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
