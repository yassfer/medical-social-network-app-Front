import { Component, OnInit } from '@angular/core';
import { HealthBotComponent } from './health-bot/health-bot.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openHealthBot(){
    //this.healthBotComponent.callChat()
    this.router.navigate(["/healthBot"])
  }

  openWorkoutBot(){
    this.router.navigate(["/workoutBot"])
  }
}
