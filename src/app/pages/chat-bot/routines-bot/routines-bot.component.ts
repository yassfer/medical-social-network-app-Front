import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-routines-bot',
  templateUrl: './routines-bot.component.html',
  styleUrls: ['./routines-bot.component.scss']
})
export class RoutinesBotComponent implements OnInit {
  @ViewChild('routinesBot') chat !: ElementRef ;

  constructor() { }

  ngOnInit(): void {
    this.chatBot();
  }

  chatBot(){

    setTimeout(() => {
      const scrip = document.createElement('script');
      scrip.innerHTML = "window.watsonAssistantChatOptions = {"+
        "integrationID: '6fef6461-5921-4d44-a07e-cd70431e16a2',"+
        "region: 'eu-gb',"+
        "serviceInstanceID: 'b010d223-7a3a-464d-851d-0608e09e2d78',"+
        "onLoad: function(instance) { instance.render(); }"+
        "};";
      this.chat.nativeElement.appendChild(scrip);

      setTimeout(() => {
        const t=document.createElement('script');
        t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
        document.head.appendChild(t);
      });
    });
   }

}
