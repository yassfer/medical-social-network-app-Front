import { Component, OnInit } from '@angular/core';
import { Invitation } from 'src/app/entities/invitation';
import { InvitationService } from './invitation.service';
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { User } from 'src/app/entities/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  invitations: Invitation[];
  idCurrentUser: number;
  searchText;
  base64Data: any;
  base64DataS: any;
  users: User[];
  myFriends: User[];
  myWaiting: Invitation[];
  mySenders: Invitation[];

  constructor(private invitationService: InvitationService, private tokenStorage: TokenStorageService, private router: Router) {
    this.idCurrentUser = Number(tokenStorage.getId());
  }

  ngOnInit(): void {
    this.getInvitations();
    this.getAllUsers();
  }

  getInvitations() {
    this.invitationService.getAllInvitations(this.idCurrentUser).subscribe(data => {
      this.invitations = data;
      for (let i = 0; i < this.invitations.length; i++) {
        this.base64DataS = this.invitations[i].sender.logo;
        this.invitations[i].sender.imageProfile = 'data:image/jpeg;base64,' + this.base64DataS;
      }
    },
      error => console.log(error));
  }

  deleteInvitation(invitationId: number) {
    this.invitationService.DeleteInvitation(invitationId).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }

  AcceptInvitation(id: number, invitationId: number) {
    this.invitationService.AcceptInvitation(id, invitationId).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }

  AcceptInvitationUser(idSender: number) {
    this.invitationService.AcceptInvitationUser(idSender, this.idCurrentUser).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }

  EnvoiInvitationUser(idUser: number) {
    this.invitationService.AddInvitation(this.idCurrentUser, idUser).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    //window.location.reload();
  }

  getAllUsers() {
    this.invitationService.getAllUsers().subscribe(data => {
      this.users = data;
      //First traitment
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == this.idCurrentUser) {
          this.users.splice(i, 1)
        }
      }
      //Second traitment
      this.invitationService.getMyFriends(this.idCurrentUser).subscribe(data => {
        this.myFriends = data;
        for (let i = 0; i < this.users.length; i++) {
          for (let j = 0; j < this.myFriends.length; j++) {
            if (this.users[i].id === this.myFriends[j].id) {
              this.users[i].myFriend = true;
            }
          }
        }
      },
        error => console.log(error));
      //Third traitment
      this.invitationService.getAllInvitations(this.idCurrentUser).subscribe(data => {
        console.log("data=> "+data)
        this.myWaiting = data;
        console.log("wss:: "+this.myWaiting)
        for (let i = 0; i < this.users.length; i++) {
          for (let j = 0; j < this.myWaiting.length; j++) {
            if (this.users[i].id === this.myWaiting[j].receiver.id) {
              this.users[i].invited = true;
              console.log("invited:: " + this.users[i].invited);
            }
          }

        }
      },
        error => console.log(error));
      //Forth traitment
      this.invitationService.getBySender(this.idCurrentUser).subscribe(data => {
        this.mySenders = data;
        for (let i = 0; i < this.users.length; i++) {
          for (let j = 0; j < this.mySenders.length; j++) {
            if (this.users[i].id === this.mySenders[j].sender.id) {
              this.users[i].waitingList = true;
              console.log("waitingList:: " + this.users[i].waitingList);
            }
          }

          this.base64Data = this.users[i].logo;
          this.users[i].imageProfile = 'data:image/jpeg;base64,' + this.base64Data;
        }
      },
        error => console.log(error));
    },

      error => console.log(error));
  }

  goToProfile(id: number) {
    this.router.navigate(['/profile', id]);
  }
}
