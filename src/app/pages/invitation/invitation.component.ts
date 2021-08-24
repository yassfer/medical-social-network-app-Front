import { Component, OnInit } from '@angular/core';
import { Invitation } from 'src/app/entities/invitation';
import { InvitationService } from './invitation.service';
import { TokenStorageService } from "src/app/auth/token-storage.service";

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

invitations: Invitation[];
idCurrentUser: number;

  constructor(private invitationService: InvitationService, private tokenStorage: TokenStorageService) {
    this.idCurrentUser = Number(tokenStorage.getId());
  }

  ngOnInit(): void {
    this.getInvitations();
  }

  getInvitations(){
    this.invitationService.getAllInvitations(this.idCurrentUser).subscribe(data => {
      this.invitations = data;
      console.log(this.invitations);
    },
      error => console.log(error));
  }


  deleteInvitation(invitationId: number){
    this.invitationService.DeleteInvitation(invitationId).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }



  AcceptInvitation(id: number, invitationId: number){
    this.invitationService.AcceptInvitation(id, invitationId).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
      window.location.reload();
  }

}
