import { identifierModuleUrl } from '@angular/compiler';
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
import { PublicationCommunity } from 'src/app/entities/PublicationCommunity';
import { User } from 'src/app/entities/User';
import { InvitationService } from '../../invitation/invitation.service';
import { CommunityServiceService } from '../community-service.service';

@Component({
  selector: 'app-community-profile',
  templateUrl: './community-profile.component.html',
  styleUrls: ['./community-profile.component.scss']
})
export class CommunityProfileComponent implements OnInit {

  condition: boolean;
  base64Data: any;
  base64DataP: any;
  base64DataPp: any;
  base64DataC: any;
  base64DataU: any;
  community: Community;
  click = true;
  com = true;
  pieceJoints: PieceJoint[];
  liking: Liking = new Liking();
  Newpublication: PublicationCommunity = new PublicationCommunity();
  comment: Comments = new Comments();
  publica: PublicationCommunity = new PublicationCommunity();
  publications: PublicationCommunity[];
  closeResult = '';
  file: any[];
  friends: User[];
  user: User;
  communityId: number;
  idCurrentUser: number;
  nbrparticipants: number;
  testfollow : boolean;
  participants = new Set();
  ////
  myFriends: User[];
  myWaiting: Invitation[];
  mySenders: Invitation[];

  constructor(private communityService: CommunityServiceService, private invitationService: InvitationService,
    private router: Router, private domSanitizer: DomSanitizer, private modalService: NgbModal,
    private route: ActivatedRoute, private tokenStorage: TokenStorageService) {
      this.idCurrentUser = Number(this.tokenStorage.getId());
      this.nbrparticipants = 0;
  }


  ngOnInit() {
    this.communityId = this.route.snapshot.params['id'];
    this.getCommunity(this.communityId);
    this.getUser(this.idCurrentUser);
    this.reloadData(this.communityId);
  }

  getUser(idCurrentUser: number) {
    this.communityService.getUserById(idCurrentUser).subscribe(data => {
      this.user = data;
      this.base64DataU = this.user.logo;
      this.user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataU;
    },
      error => console.log(error));
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

  getCommunity(id: number) {
    this.communityService.getCommunityById(id).subscribe(data => {
      this.community = data;
      this.base64DataP = this.community.image;
      this.community.imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
      this.community.participants.forEach(element => {
        this.base64DataP = element.logo;
        element.imageProfile = 'data:image/jpeg;base64,' + this.base64DataP;
        this.participants.add(element);
      });
      this.nbrparticipants=this.participants.size;
      this.testfollow=this.community.followed;
    },
      error => console.log(error));
  }

  onDeletePub(id: number) {
    this.communityService.deletePub(id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }
  onComment(idUser: number, idPub: number) {
    this.communityService.createComment(idUser, idPub, this.comment).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }

  onDeleteCommment(id: number) {
    this.communityService.deleteCom(id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }

  onLike(idUser: number, idPub: number) {
    this.click = !this.click;
    this.communityService.createLike(idUser, idPub).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }

  onDislike(id: number) {
    this.click = !this.click;
    this.communityService.deleteLike(id).subscribe(data => {
      console.log(data);
    },
      error => console.log(error));
    window.location.reload();
  }
  commenting() {
    this.com = !this.com;
  }


  getPublicationByCommunityId(idCommunity: number) {
    this.communityService.getPubByCommunityId(idCommunity).subscribe(data => {

      this.publications = data;
      console.log(this.publications);
    },
      error => console.log(error));
  }

  reloadData(idCommunity: number) {
    this.communityService.getPubByCommunityId(idCommunity).subscribe(data => {
      this.publications = data;
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
          this.base64DataPp = this.publications[i].community.image;
          this.publications[i].community.imageProfile = 'data:image/jpeg;base64,' + this.base64DataPp;
          this.publications[i].NbrLike = this.publications[i].likes.length;
          this.community = this.publications[i].community;

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
    this.communityService.imagesUploadWithoutPubId(formData).subscribe(data => {
      console.log(data.body);
      this.pieceJoints = data.body;
    },
      error => {
        console.log(error);
      });

  }


  updatePieceJoint(pubId: number, pieceJoints: PieceJoint[]) {
    console.log(pieceJoints);
    this.communityService.updatePieceJoint(pubId, pieceJoints).subscribe(data => {
    });
  }

  onPublication() {
    this.communityService.createPublication(this.idCurrentUser, this.communityId, this.Newpublication).subscribe(data => {
      this.publica = data;
      this.updatePieceJoint(this.publica.id, this.pieceJoints);
    });

    //window.location.reload();

  }



  Tofollow(id :number){
    this.communityService.ToFollow(id,this.idCurrentUser).subscribe( data => {
      console.log(data)});
      this.communityService.getCommunityById(id).subscribe( data => {
        this.community = data;
        });
        this.community.followed =true;
      window.location.reload();
  }
  ToUnfollow(id :number){
    this.communityService.ToUnFollow(id,this.idCurrentUser).subscribe( data => {
      console.log(data)});
      this.communityService.getCommunityById(id).subscribe( data => {
        this.community = data;
        });
        this.community.followed =false;
      window.location.reload();
  }

}
