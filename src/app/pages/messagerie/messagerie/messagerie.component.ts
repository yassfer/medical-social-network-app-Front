import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Message } from 'src/app/entities/message';
import { User } from 'src/app/entities/User';
import { MessagerieService } from '../messagerie.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent implements OnInit {
  currentId: number;
  opendId: number;
  userConnected = [];
  condition: boolean;
  base64Data: any;

  display = false;
  constructor(private msgService: MessagerieService, private tokenStorage: TokenStorageService) {
    this.currentId = Number(tokenStorage.getId());
  }

  ngOnInit(): void {
    this.getUserConnected();
  }

  onpenDisc(id) {
    this.display = true;
    this.opendId = id;
  }
  closeDisc($event) {
    this.display = $event;

  }

  getUserConnected() {
    this.msgService.getUserList(this.currentId).subscribe(data => {
      this.userConnected = data;
      if(this.userConnected.length === 0){
        this.condition = true;
      }else{
        this.condition = false;
        for (let i = 0; i < this.userConnected.length; i++) {
          this.base64Data = this.userConnected[i].image;
          this.userConnected[i].imageProfile = 'data:image/jpeg;base64,' + this.base64Data;
        }
      }
      console.log(this.userConnected);
    })
  }

}
