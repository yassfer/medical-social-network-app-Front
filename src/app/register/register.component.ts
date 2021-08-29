import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  file: any;
  userEmail: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {

   }

   onFileSelected(event: any){
    this.file = event.target.files[0];
    console.log(this.file);
  }

  onUpload() {
    console.log(this.file);
      let formData = new FormData();
      formData.append("pieceJustif", this.file);
      this.authService.uploadImage(this.userEmail, formData).subscribe(data => {
        console.log(data.body);
      },
        error => {
          console.log(error);
        });

  }

  onSubmit() {
    console.log(this.form);
    this.userEmail = this.form.mail;
    this.signupInfo = new SignUpInfo(
      this.form.firstName,
        this.form.lastName,
        this.form.mail,
        this.form.username,
        this.form.password,
        this.form.birthDate,
        this.form.address,
        this.form.profession,
        this.form.recommander
      );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.onUpload();
        this.goToLoginPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }





  goToLoginPage(){
    this.router.navigate(["/auth/login"]);
  }
}
