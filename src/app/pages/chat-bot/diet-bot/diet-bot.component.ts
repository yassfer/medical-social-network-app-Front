import { Component, OnInit } from '@angular/core';
import { Participant } from 'src/app/entities/Participant';
import { User } from 'src/app/entities/User';
import { ChatBotService } from '../chat-bot.service';

@Component({
  selector: 'app-diet-bot',
  templateUrl: './diet-bot.component.html',
  styleUrls: ['./diet-bot.component.scss']
})
export class DietBotComponent implements OnInit {
  currentUser: User;
  participant: Participant=new Participant();
  submitted = false;
  currentName="rania";
  constructor(private chatBotService: ChatBotService) { }

  ngOnInit(): void {
  }
  checkDiet() {
    console.log(this.participant);
    this.chatBotService
    .checkDiet(this.participant).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
  //window.location.reload();
}

  setGender(gender : string){
    this.participant.gender = gender;
  }

}
