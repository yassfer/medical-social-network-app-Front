import { Component, OnInit } from '@angular/core';
import { Intents } from 'src/app/entities/intents';
import { ChatBotService } from './chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {

  question: string;
  reponse: string;
  intents: Intents = new Intents();
  constructor(private chatBotService: ChatBotService) { }

  ngOnInit(): void {
  }
  setValue() {
    this.chatBotService
    .getChatResponse(this.question).subscribe(data => {
      console.log(data)
      this.intents = data;
      this.reponse = this.intents.responses;
      console.log(this.reponse)
    },
    error => console.log(error))
  }

}
