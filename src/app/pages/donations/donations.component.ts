import { style } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-donations",
  templateUrl: "donations.component.html",
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {


  organisations =[
    {
      id:1,
      nom: "Croissant Rouge Tunisien",
      image :"../../../assets/imgOrg/croissant.jpg",
      url:"https://www.ccmtunisie.org.tn/directory/fiches/croissant-rouge-tunisien-crt",
      toDonate:"https://commerce.coinbase.com/checkout/c6299628-7924-4e30-a1bd-6e608733ff9e",
    },
    {
      id:2,
      nom: "Darna",
      image :"../../../assets/imgOrg/darna.png",
      url:"https://darna.tn/",
      toDonate:"https://commerce.coinbase.com/checkout/caad690f-d71d-4267-968f-c3f505ea392a"

    },
    {
      id:3,
      nom: "SOS Villages d'enfants",
      image :"../../../assets/imgOrg/sos.png",
      url:"http://sosve.tn/",
      toDonate:"https://commerce.coinbase.com/checkout/18422e5b-b4c3-4495-a908-4f031b39b215"

    },
    {
      id:4,
      nom: "Jeunes Science de Tunisie",
      image :"../../../assets/imgOrg/jeune.png",
      url:"https://jeunesscience.tn/contact/",
      toDonate:"https://commerce.coinbase.com/checkout/5e4feeb0-5ac8-4361-b3fc-c9e2538f9248"

    }
  ]


  constructor() {}

  ngOnInit() {}


}
