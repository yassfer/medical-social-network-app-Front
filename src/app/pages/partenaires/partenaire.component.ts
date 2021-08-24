import { Component, OnInit } from '@angular/core';
import { Partenaire } from 'src/app/entities/Partenaire';
import { Notification } from 'src/app/entities/Notification';
import { NotificationService } from '../notifications/notification.service';
import { PartenaireService } from './partenaire.service';

@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.scss'],
})
export class PartenaireComponent implements OnInit {


  constructor(private notifService: NotificationService, private partService: PartenaireService) { }
  Partnerlist= [];
  PartnerlistDiscount= [];
  IdDetail :number;
  myDate = new Date();

  currentid=1;
  currentScore=95;
  showDetail=false;
  scoreFail=false;
  ngOnInit(): void {
    this.getListPartenaire();
  }

  getListPartenaire(){
    this.partService.getPartnerList().subscribe( data => {
   this.Partnerlist=data;
   this.checkExpireDate(this.Partnerlist);
    })
  }

  checkExpireDate(partner){

    partner.forEach(element => {
  let day =this.DiffBetweenDates(element.startDate)
  if (day>element.expire) {
    console.log(" expired");
    this.partService.deletePartner(element.id).subscribe(data => {
      console.log("deleted");
     },
    error => console.log(error));
  }else {
    console.log("non expired")
  }
    });
    this.getListPartnerDiscount(partner);
  }

  getListPartnerDiscount(list) {

    let reduction ;
    let restant;
    let scoreReduct;
    list.forEach(element => {
      reduction=this.setDiscount(this.currentScore,element.product);
      scoreReduct=this.scoreToDiscount(reduction);
      restant=element.expiration-this.DiffBetweenDates(element.dateCreation);
      const Discountpartner = new Partenaire(element.id,element.nom,element.address,element.product,element.image,reduction,element.expiration,element.dateCreation,restant,scoreReduct,element.code);
      this.PartnerlistDiscount.push(Discountpartner)
    });
console.log(this.PartnerlistDiscount);
  }

DiffBetweenDates(dateSent){
  let currentDate = new Date();
  dateSent = new Date(dateSent);

  return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
}

sendCode(nom,id,reduction){
if (this.checkScore(this.currentScore)) {
  this.Partnerlist.forEach(element => {
    if (element.nom==nom) {
      console.log("if");

      let code=element.code;
      let content="Your promo code for "+nom+" with "+reduction+"% off, is : "+code;
      let notif  = new Notification(content,this.currentid,this.myDate);
      console.log(notif);
      this.updateScore(reduction);
    /*  this.notifService
      .createNotif(notif).subscribe({
        next :data => {
        console.log(data);
        window.location.reload();

      },
        error : error => console.log(error)});*/
    }
  });
}
else  {
  this.scoreFail=! this.scoreFail;
  this.IdDetail=id;
}
  }

checkScore (score){
  return score>50;
}

setDiscount(score,product){
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
    if (reduction>100) {
      reduction=70;
    }
  }
  else reduction=0;

return reduction;
}

scoreToDiscount(reduction){
  return reduction*5
}
 updateScore(reduction) {
let newScore=this.currentScore-this.scoreToDiscount(reduction)
console.log(newScore);
 }



onShowDetail(id)
{
  this.IdDetail=id;
this.showDetail=!this.showDetail;
}
}
