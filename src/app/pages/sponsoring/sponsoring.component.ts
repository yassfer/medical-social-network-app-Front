import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Entreprise } from 'src/app/entities/entreprise';
import { SponsoringService } from './sponsoring.service';

interface Catégorie {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sponsoring',
  templateUrl: './sponsoring.component.html',
  styleUrls: ['./sponsoring.component.scss']
})
export class SponsoringComponent implements OnInit {
  selectedFile: File;
  EntrepriseR: Entreprise;
  idEntrepriseR: number;
  Entreprise: Entreprise = new Entreprise();
  idCurrentUser: number;

  Entreprises: Entreprise[];
  base64Data: any;
  condition: boolean;
  currentUserId: number = 1;
  closeResult = '';

  submitted = false;
  idChallenge: any;
  message: string;
  idC : any;

  constructor(private route: ActivatedRoute,
    private router: Router, private httpClient: HttpClient, private modalService: NgbModal , private sponsoringservice : SponsoringService, private tokenStorage: TokenStorageService) {
      this.idCurrentUser = Number(tokenStorage.getId());
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


  Catégories: Catégorie[] = [
    {value: 'Food', viewValue: 'Food'},
    {value: 'Sport', viewValue: 'Sport'},
    {value: 'Medical', viewValue: 'Medical'}
  ];
  setProduct(choix : string){
    this.Entreprise.product = choix;
  }

  ngOnInit(): void {
    this.reloadData();

  }
/*
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }*/
  public onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    console.log("id::: " + this.idCurrentUser);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.sponsoringservice
      .createEntrepriseWithPiece(this.idCurrentUser, uploadImageData).subscribe(data => {
        console.log(data);
        this.EntrepriseR = data;
        this.idEntrepriseR = this.EntrepriseR.id;
      },
        error => console.log(error));
  }
  save() {
    this.Entreprise.datecreation= new Date();
    this.sponsoringservice
      .saveEntreprise(this.idEntrepriseR, this.Entreprise).subscribe(data => {
        console.log(data);
      },
        error => console.log(error));
    //window.location.reload();
    console.log(this.Entreprise);
  }

  reloadData() {
    this.sponsoringservice.getEntrepriseList().subscribe(data => {
      this.Entreprises = data;
      if (this.Entreprises.length === 0) {
        this.condition = true;
      } else {
        this.condition = false;
        for (let i = 0; i < this.Entreprises.length; i++) {
          this.base64Data = this.Entreprises[i].image;
          this.Entreprises[i].pieceJoint = 'data:image/jpeg;base64,' + this.base64Data;
        }
      }

    });
  }








  }

