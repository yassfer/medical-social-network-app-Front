import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ChallengeService } from './challenge.service';
import { Challenge } from 'src/app/entities/Challenge';

@Component({
  selector: "app-dashboard",
  templateUrl: "challenge.component.html",
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  challenges: Challenge[];
  base64Data: any;
  condition: boolean;
  constructor(private challengeService: ChallengeService, private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

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

  gotoCreateChallenge() {
    this.router.navigate(['/challenge/create']);
  }
  gotoCheckChallenge() {
    this.router.navigate(['/challenge/myChallenges']);
  }
}
