import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/entities/Notification';
import { NotificationService } from '../notifications/notification.service';
import { PartenaireService } from './partenaire.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { User } from 'src/app/entities/User';
import { Entreprise } from 'src/app/entities/Entreprise';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.scss'],
})
export class PartenaireComponent implements OnInit {


  constructor(private notifService: NotificationService, private partService: PartenaireService,
    private userService: UserService,
    private tokenStorage: TokenStorageService) {
      this.currentid = Number(tokenStorage.getId());

    }

    Partnerlist= [];
    PartnerlistDiscount= [];
    IdDetail :number;
    myDate = new Date();
    currentid:number;
    currentScore:number;
    showDetail=false;
    scoreFail=false;
    currentUser: User;


    ngOnInit(): void {
      this.getScorebyId(this.currentid);
      this.getListPartenaire();

    }



    getListPartenaire(){
      this.partService.getPartnerList().subscribe( data => {
     this.Partnerlist=data;
     this.checkExpireDate(this.Partnerlist);
      })
    }


    checkExpireDate(partner){
      let nbjour;
      let restant;
     partner.forEach(element => {
      nbjour=this.DiffBetweenDates(element.datecreation,element.expiration);
      restant=nbjour-this.DiffBetweenDates(element.datecreation,new Date());
    if (0>=restant) {
      this.partService.deletePartner(element.id).subscribe(data => {
       },
      error => console.log(error));
    }else {
      console.log(restant+"non expired")
    }
      });
      this.getListPartnerDiscount(partner);
    }

     getListPartnerDiscount(list) {

      let point ;
      let restant;
      let scoreReduct;
      let nbjour;
      list.forEach(element => {
        point=this.setDiscount(this.currentScore,element.product,element.reduction);
        scoreReduct=this.scoreToDiscount(point);
        scoreReduct=Math.trunc(scoreReduct) ;
        nbjour=this.DiffBetweenDates(element.datecreation,element.expiration);
        restant=nbjour-this.DiffBetweenDates(element.datecreation,new Date());
        const Discountpartner = new Entreprise(element.id,element.nom,element.address,element.product,element.image,element.expiration,point,element.datecreation,restant,scoreReduct,element.code);
        this.PartnerlistDiscount.push(Discountpartner)
      });
    }

    DiffBetweenDates(dateSent,date){
      date = new Date(date);
      dateSent = new Date(dateSent);

      return Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
    }

    sendCode(nom,id,reduction){
      if (this.checkScore(this.currentScore)) {
        this.Partnerlist.forEach(element => {
          if (element.nom==nom) {
            let code=element.code;
            let content="Your promo code for "+nom+" with "+reduction+"% off, is : "+code;
            let notif  = new Notification(content,this.currentid,this.myDate);
            this.updateScore(reduction);
            this.createnotif(notif);
            /*this.wait(10000);
            content="Now, your score is "+this.currentScore+" Keep going ! ";
            notif  = new Notification(content,this.currentid,this.myDate);
            this.createnotif(notif);*/

          }
        });
      }
      else  {
        this.scoreFail=! this.scoreFail;
        this.IdDetail=id;
      }
        }

        createnotif(notif) {
          this.notifService
          .createNotif(notif).subscribe({
            next :data => {
            console.log(data);
          },
            error : error => console.log(error)});
            window.location.reload();
        }

        checkScore (score){
          return score>50;
        }

        setDiscount(score,product,max){
          let reduction : number;
          let  x=0;
          if (this.checkScore(this.currentScore)) {
            if (product=="Food") {
              x=5;}
            else if (product=="Sport")
           { x=15;}
          else if (product=="Medical")
            {x=10;}
            reduction=score*x/100;
            if (reduction>max) {
              reduction=max;
            }
          }
          else reduction=0;

        return reduction;
        }

        scoreToDiscount(reduction){
          return reduction*5
        }
        updateScore(reduction) {
          let newScore=this.currentScore-this.scoreToDiscount(reduction);
          this.userService.updateScore(this.currentid, Math.trunc(newScore) ).subscribe(data => {
            console.log(data);
          },
            error => console.log(error));
         }

         getScorebyId(id) {
          this.userService.getScoreById(id).subscribe( data => {
           this.setScore(data);
             })

         }

         setScore(score){
          this.currentScore=score;
         }

         wait(ms){
          var start = new Date().getTime();
          var end = start;
          while(end < start + ms) {
            end = new Date().getTime();
         }
        }



        onShowDetail(id)
        {
          this.IdDetail=id;
        this.showDetail=!this.showDetail;
        }
        }
