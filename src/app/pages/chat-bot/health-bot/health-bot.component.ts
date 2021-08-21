import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Intents } from 'src/app/entities/intents';
import { ChatBotService } from '../chat-bot.service';

@Component({
  selector: 'app-health-bot',
  templateUrl: './health-bot.component.html',
  styleUrls: ['./health-bot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HealthBotComponent implements OnInit {
  @ViewChild('message')message!: ElementRef;
  @ViewChild('messageBox')messageBox!: ElementRef;
  @ViewChild('chatBot')chatBot!: ElementRef;
  @ViewChild('chatBotToggle')chatBotToggle!: ElementRef;

  running = false;
  intents: Intents = new Intents();
  reponse: string;

  constructor(private chatBotService: ChatBotService) { }

  ngOnInit(): void {
  }


  send() {
    if (this.running == true) return;
    const msg = this.message.nativeElement.value;
    ///
    this.chatBotService
    .getChatResponse(msg).subscribe(data => {
      console.log(data)
      this.intents = data;
      this.reponse = this.intents.responses;
      console.log(this.reponse)
    },
    error => console.log(error))
    ///
    if (msg == "") return;
    this.running = true;
    this.addMsg(msg);
    //DELEAY MESSAGE RESPOSE Echo
    setTimeout(()=>{
      this.addResponseMsg(this.reponse)
    },1000)
  }

  addMsg(msg : string) {
    var div = document.createElement("div");
    div.innerHTML =
      "<span style='flex-grow:1'></span><div class='chat-message-sent'>" +
      msg +
      "</div>";
    div.className = "chat-message-div";
    this.messageBox.nativeElement.appendChild(div);
    //SEND MESSAGE TO API
    this.message.nativeElement.value = "";
    this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
  }

  addResponseMsg(msg : string) {
    var div = document.createElement("div");
    div.innerHTML = "<div class='chat-message-received'>" + msg + "</div>";
    div.className = 'chat-message-div';
    console.log(this.messageBox.nativeElement);
    this.messageBox.nativeElement.appendChild(div);
    this.messageBox.nativeElement.scrollTop = this.messageBox.nativeElement.scrollHeight;
    this.running = false;
    console.log(this.messageBox.nativeElement);
  }

  chat(){
    if (this.chatBot.nativeElement.classList.contains("collapsed")) {
      this.chatBot.nativeElement.classList.remove("collapsed")
      this.chatBotToggle.nativeElement.children[0].style.display = "none"
      this.chatBotToggle.nativeElement.children[1].style.display = ""
      setTimeout(()=>{
        this.addResponseMsg("Start talking with the bot , type quit to stop the chatbot")
      },1000)
    }
    else {
      this.chatBot.nativeElement.classList.add("collapsed")
      this.chatBotToggle.nativeElement.children[0].style.display = ""
      this.chatBotToggle.nativeElement.children[1].style.display = "none"
    }
  }
}
