import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Comments } from 'src/app/entities/Comments';
import { Liking } from 'src/app/entities/liking';
import { PieceJoint } from 'src/app/entities/PieceJoint';
import { Publication } from 'src/app/entities/publication';
import { User } from 'src/app/entities/User';
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


  constructor(private publicationservice: PublicationService,private invitationService: InvitationService,
    private router: Router, private domSanitizer: DomSanitizer, private modalService: NgbModal,
    private route: ActivatedRoute, private tokenStorage: TokenStorageService) {
     }


  ngOnInit() {
    this.idUser =  this.route.snapshot.params['id'];
    this.getUser(this.idUser);
    this.getMyFriends();
    this.reloadData(this.idUser);
  }

  goToProfile(id:number){
    this.router.navigate(['/profile', id]);
  }



  /////start modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  onDeleteCommment(id:number) {
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


  getPublicationByUserId(idUser: number){
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
            this.publications[i].pieceJoints[j].image= 'data:image/jpeg;base64,' + this.base64Data ;
          }
          if (this.publications[i].pieceJoints[j].contentType === "video/mp4") {
            this.base64Data = this.publications[i].pieceJoints[j].data;
            this.publications[i].pieceJoints[j].image = this.domSanitizer.bypassSecurityTrustUrl('data:video/mp4;base64, ' + this.base64Data);
          }
          if (this.publications[i].pieceJoints[j].contentType === "application/pdf") {
            this.base64Data = this.publications[i].pieceJoints[j].data;
            this.publications[i].pieceJoints[j].image= this.domSanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64, ' + this.base64Data);
          }
        }
        this.base64DataPp = this.publications[i].user.logo;
        this.publications[i].user.imageProfile = 'data:image/jpeg;base64,' + this.base64DataPp;
        this.publications[i].NbrLike = this.publications[i].likes.length;
        this.user = this.publications[i].user;
      }
    }
  }
  );
}

  //////////////////upload files
  onFileSelected(event: { target: { files: any[]; }; }){
    this.file = event.target.files;
  }
  onUpload() {
      let formData = new FormData();
      for(var i =0; i< this.file.length ; i++){
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
      for(let i=0; i<this.friends.length; i++){
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


}

