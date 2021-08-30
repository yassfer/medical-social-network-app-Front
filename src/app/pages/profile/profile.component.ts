import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Comments } from 'src/app/entities/Comments';
import { Community } from 'src/app/entities/Community';
import { Invitation } from 'src/app/entities/invitation';
import { Liking } from 'src/app/entities/liking';
import { PieceJoint } from 'src/app/entities/PieceJoint';
import { Publication } from 'src/app/entities/publication';
import { User } from 'src/app/entities/User';
import { CommunityServiceService } from '../communities/community-service.service';
import { InvitationService } from '../invitation/invitation.service';
import { PublicationService } from '../publications/publication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  condition: boolean;
  base64Data: any;
  base64DataP: any;
  base64DataPp: any;
  base64DataC: any;
  user: User;
  click = true;
  com = true;
  pieceJoints: PieceJoint[];
  liking: Liking = new Liking();
  Newpublication: Publication = new Publication();
  comment: Comments = new Comments();
  publica: Publication = new Publication();
  publications: Publication[];
  closeResult = '';
  file: any[];
  friends: User[];
  idUser: number;
  idCurrentUser: number;
  followedCommunities: Community[];
  ////
  myFriends: User[];
  allInvitations: Invitation[];

  constructor(private publicationservice: PublicationService, private invitationService: InvitationService,
    private router: Router, private domSanitizer: DomSanitizer, private modalService: NgbModal,
    private route: ActivatedRoute, private tokenStorage: TokenStorageService,private communityservice: CommunityServiceService) {
      this.idCurrentUser = Number(this.tokenStorage.getId());
  }


  ngOnInit() {
    this.idUser = this.route.snapshot.params['id'];
    this.getUser(this.idUser);
    this.getMyFriends();
    this.getfollowedCommunities(this.idCurrentUser);
    this.reloadData(this.idUser);
  }

  goToProfile(id: number) {
    this.router.navigate(['/profile', id]);
  }

  /////start modal
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  /////end modal
  getUser(idUser: number) {
    this.publicationservice.getUserById(idUser).subscribe(data => {
      this.user = data;
      //First traitment
      this.invitationService.getMyFriends(this.idCurrentUser).subscribe(data => {
        this.myFriends = data;
        console.log("MyF::")
        console.log(this.myFriends)
        for (let j = 0; j < this.myFriends.length; j++) {
          if (this.myFriends[j].id === this.user.id) {
            this.user.myFriend = true;
          }
        }
      },
        error => console.log(error));
      //Second traitment
      this.invitationService.getAll().subscribe(data => {
        this.allInvitations = data;
        console.log("all")
        console.log(this.allInvitations);
        for (let j = 0; j < this.allInvitations.length; j++) {
          if ((this.user.id === this.allInvitations[j].sender.id) && (this.idCurrentUser === this.allInvitations[j].receiver.id)) {
            this.user.waiting = true;
          }
          if ((this.user.id === this.allInvitations[j].receiver.id) && (this.idCurrentUser === this.allInvitations[j].sender.id)) {
            this.user.invited = true;
          }
        }

      },
        error => console.log(error));


      this.base64DataP = this.user.logo;
      this.user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
    },
      error => console.log(error));
  }

  onDeletePub(id: number) {
    this.publicationservice.deletePub(id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }
  onComment(idUser: number, idPub: number) {
    console.log(this.comment)
    this.publicationservice.createComment(idUser, idPub, this.comment).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }

  onDeleteCommment(id: number) {
    this.publicationservice.deleteCom(id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }

  onLike(idUser: number, idPub: number) {
    this.click = !this.click;
    this.publicationservice.createLike(idUser, idPub).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }

  onDislike(idUser: number, idPub: number) {
    this.click = !this.click;
    this.publicationservice.deleteLike(idUser, idPub).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }
  commenting() {
    this.com = !this.com;
  }

  getPublicationByUserId(idUser: number) {
    this.publicationservice.getPublicationByUserId(idUser).subscribe(data => {

      this.publications = data;
      console.log(this.publications);
    },
      error => console.log(error));
  }

  reloadData(idUser: number) {
    this.publicationservice.getPublicationByUserId(idUser).subscribe(data => {
      if (data.length === 0) {
        this.condition = true;
      } else {
        this.condition = false;
        this.publications = data;

        for (let i = 0; i < this.publications.length; i++) {
          for (let j = 0; j < this.publications[i].pieceJoints.length; j++) {
            if (this.publications[i].pieceJoints[j].contentType === "image/jpeg") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image = 'data:image/jpeg;base64,' + this.base64Data;
            }
            if (this.publications[i].pieceJoints[j].contentType === "video/mp4") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustUrl('data:video/mp4;base64, ' + this.base64Data);
            }
            if (this.publications[i].pieceJoints[j].contentType === "application/pdf") {
              this.base64Data = this.publications[i].pieceJoints[j].data;
              this.publications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64, ' + this.base64Data);
            }
          }
          this.base64DataPp = this.publications[i].user.logo;
          this.publications[i].user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataPp;
          this.publications[i].NbrLike = this.publications[i].likes.length;
          this.user = this.publications[i].user;
        }
        for (let m = 0; m < this.publications.length; m++) {
          for (let n = 0; n < this.publications[m].comments.length; n++) {
            this.base64DataC = this.publications[m].comments[n].user.logo;
            this.publications[m].comments[n].user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataC;
          }
        }
      }
    }
    );
  }

  //////////////////upload files
  onFileSelected(event: { target: { files: any[]; }; }) {
    this.file = event.target.files;
  }
  onUpload() {
    let formData = new FormData();
    for (var i = 0; i < this.file.length; i++) {
      formData.append("pieceJoints", this.file[i], this.file[i].name);
    }
    //let f = formData.getAll('pieceJoints');
    this.publicationservice.imagesUploadWithoutPubId(formData).subscribe(data => {
      console.log(data.body);
      this.pieceJoints = data.body;
    },
      error => {
        console.log(error);
      });

  }


  updatePieceJoint(pubId: number, pieceJoints: PieceJoint[]) {
    console.log(pieceJoints);
    this.publicationservice.updatePieceJoint(pubId, pieceJoints).subscribe(data => {
    });
  }

  onPublication() {
    this.publicationservice.createPublication(this.idUser, this.Newpublication).subscribe(data => {
      this.publica = data;
      this.updatePieceJoint(this.publica.id, this.pieceJoints);
    });

    window.location.reload();

  }



  getMyFriends() {
    this.publicationservice.getFriends(this.idUser).subscribe(data => {
      this.friends = data;
      for (let i = 0; i < this.friends.length; i++) {
        this.base64DataP = this.friends[i].logo;
        this.friends[i].imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
      }
    },
      error => {
        console.log(error);
      });

  }


  onFollow(senderId: number, receiverId: number) {
    this.invitationService.AddInvitation(senderId, receiverId).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log(error);
      });

  }

  getfollowedCommunities(id : number){
    this.communityservice.getFollowedCommunities(id).subscribe( data => {
      this.followedCommunities=data;
      console.log(this.followedCommunities);
    })
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
    window.location.reload();
  }

  RefuseInvitationUser(idSender: number) {
    this.invitationService.DeleteInvitationUser(idSender, this.idCurrentUser).subscribe(data => {
      console.log(data);
    },
      error => console.error(error));
      window.location.reload();
  }
}

