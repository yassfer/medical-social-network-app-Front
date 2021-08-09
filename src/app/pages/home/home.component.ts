import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { PublicationService } from './services/publication.service';
import { Router } from '@angular/router';
import { Liking } from 'src/app/models/liking';
import { Comment } from 'src/app/models/comment';
import { Publication } from 'src/app/models/publication';
@Component({
  selector: "app-dashboard",
  templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {

  click=true;
  com=true;
  pub=true;
  liking: Liking = new Liking();
  comment: Comment = new Comment();
  public: Publication = new Publication();
  publ: Publication [];

  like:number=5;
  
  constructor(private publicationservice : PublicationService,
    private router: Router) { }
  ngOnInit() {
    this.publicationservice.getPub().subscribe(data => {
      this.publ = data;
    });
    console.log("-----------"+this.publ);

  }

  onPublication() {
    this.publicationservice.createPub(this.public).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));      }

    onDeletePub(){
      this.publicationservice.deletePub(this.public.id).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));      
    }
 
  onComment () {
    this.publicationservice.createCom(this.comment).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
  }

  onDeleteCommment () {
    this.publicationservice.deleteCom(this.comment.id).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
  }
  onLike () {
    this.like++;
    this.click=!this.click;
    this.publicationservice.createLike(this.liking).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));

  }
  onDislike () {
    this.like--;
    this.click=!this.click;
    this.publicationservice.deleteLike(this.liking.id).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
  }

  publication() {
    this.pub=!this.pub;
      }
  commenting () {
    this.com=!this.com;

  }

}
