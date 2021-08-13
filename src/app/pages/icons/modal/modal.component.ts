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
  
  constructor(private route: ActivatedRoute, private http: HttpClient,
    public publicationservice: PublicationService, private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    const idP = this.route.snapshot.paramMap.get('idP');
    const file: File = event.target.files;
    const formData = new FormData();
    const filesList: Array<Object> = [];

   if (file) {
      /*for (let f of file) {
        filesList.push({item: f})
      }*/
      console.log(file)
      
      formData.append("pieceJoints", file as Blob);
      console.log(formData)
      const upload$ = this.publicationservice.uploadImage(Number(idP), formData).subscribe(data => {
      },
        error => console.log(error));

      this.gotoList();
    }
  }
  gotoList() {
    this.router.navigate(['/icons']);
  }

}
