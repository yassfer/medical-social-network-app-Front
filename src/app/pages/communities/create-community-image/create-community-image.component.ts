import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-community-image',
  templateUrl: './create-community-image.component.html',
  styleUrls: ['./create-community-image.component.scss']
})
export class CreateCommunityImageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) { }
  selectedFile: File;
  message: string;

  ngOnInit(): void {
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    const idC = this.route.snapshot.paramMap.get('idC');

    this.httpClient.put('http://localhost:8080/communities/uploadImage/' + idC, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded';
        } else {
          this.message = 'Image not uploaded';
        }
        this.goToCommunityList();
      }
      );
  }

  Ignorer()
  {
    this.goToCommunityList();
  }
  goToCommunityList()
  {
    this.router.navigate(['communities']);
  }



}
