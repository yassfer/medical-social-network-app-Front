import { Component, Input, OnInit,EventEmitter,Output,ViewChild ,ElementRef} from '@angular/core';
import { Message } from 'src/app/entities/message';
import { MessagerieService } from '../messagerie.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { User } from 'src/app/entities/User';

@Component({
  selector: 'app-discuss',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit {

  @Input() id: number
  @Output () event =new EventEmitter<boolean>();
  @ViewChild('msg') sendmsg: ElementRef;

  currentId: number;
  currentName: string;
  UserToTalk :User = new User();
  message : Message = new Message();
  filtredMsg: Array<Message> = [];
  allMsg= [];

  constructor(private msgService: MessagerieService, private tokenStorage: TokenStorageService) {
    this.currentId= Number(tokenStorage.getId());
    this.currentName= tokenStorage.getUsername();
   }
  ngOnInit(): void {
    this.getUserDetails(this.id);
    this.getAllMsg();
   // this.wait(10000);  //7 seconds in milliseconds
  }

  checkMsgLength(msg) {
    if (msg.length==0)
      return false;
    else return true
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
  }

  refresh(): void {
    window.location.reload();
  }

  filterMsg (msg) {
        this.allMsg=msg;
        this.allMsg.forEach(element => {
      if (element.sender== this.id && element.receiver == this.currentId || element.receiver == this.id && element.sender == this.currentId)
      {
        this.filtredMsg.push(element);
      }
      else {
        console.log("nothing to show ");
      }
    })
    console.log(this.filtredMsg);
    }

getUserDetails(id)
{
  this.msgService.getUserList(this.currentId).subscribe( data => {
    data.forEach(element => {
      if (element.id==id){
        this.UserToTalk=element;
      }}
    );})
  }

  changeDisc() {
      this.event.emit(false);
  }

  getAllMsg() {
      this.msgService.getMsgList().subscribe( data => {
        this.allMsg=data;
        console.log("new all mg");
        console.log(this.allMsg);
        this.filterMsg(this.allMsg)
    });
    }

    sendMsg(msg,id) {
      if (this.checkMsgLength(msg)) {
        this.message.sender=this.currentId;
        this.message.receiver=id;
        this.message.content=msg;
        this.message.timestamp=new Date();
        this.sendmsg.nativeElement.value = '';
        this.msgService
        .setMsg(this.message).subscribe({
          next :data => {
        },
          error : error => console.log(error)});
        this.wait(5000);
        this.filtredMsg=[];
        this.ngOnInit();
      }

    }

}
