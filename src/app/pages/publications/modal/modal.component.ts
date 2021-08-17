import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from '../publication.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  fileName = '';
  file: any[];
  files: any[];

  constructor(private route: ActivatedRoute, private http: HttpClient,
    public publicationservice: PublicationService, private router: Router) { }

  ngOnInit(): void {
  }
  onFileSelected(event: { target: { files: any[]; }; }){
    this.file = event.target.files;
  }
  onUpload() {
    const idP = this.route.snapshot.paramMap.get('idP');
      const formData = new FormData();
      for(var i =0; i< this.file.length ; i++){
        formData.append("pieceJoints", this.file[i], this.file[i].name);
      }
      let f = formData.getAll('pieceJoints');
      this.publicationservice.imagesUpload(Number(idP), formData).subscribe(data => {
        console.log(data);
      },
        error => console.log(error));
        this.gotoList();
  }
  gotoList() {
    this.router.navigate(['/publications']);
  }
}
