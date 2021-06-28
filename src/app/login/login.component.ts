import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthToken } from '../models/AuthToken';
import {User} from '../models/User';
import { LoginService } from '../services/login.service';
import { AuthService } from '../core/auth.service';
import { LoginpageCommunicationService } from '../core/loginpage-communication.service';
import { AuthTokenService } from '../core/authtoken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register:boolean=false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string;
  authToken: AuthToken = new AuthToken();
  user: User;
  

  constructor(private formBuilder: FormBuilder,private loginservice: LoginService, private auth: AuthService, private loginCommunication: LoginpageCommunicationService, private authTokenService:AuthTokenService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      emailId:  ['', [Validators.required]],
      password:  ['', [Validators.required, Validators.minLength(7),Validators.maxLength(20)]]
    });

    this.registerForm=this.formBuilder.group({
      emailId:  ['', [Validators.required]],
      password:  ['', [Validators.required, Validators.minLength(7),Validators.maxLength(20)]],
      confirmPassword:  ['', [Validators.required]],
      username:  ['', [Validators.required]]
    }, { validator: this.checkPassword('password', 'confirmPassword') });
  }

  toogleSignInRegister(){
    this.register=!this.register;
  }

  login() {
    this.loginservice.login(this.loginForm.value).subscribe(
      (response) => {
        this.errorMessage = null;
        this.authToken = response;
        this.populateUser(this.authToken,this.loginForm.controls['emailId'].value);
        this.authTokenService.refreshTokenCountDown(this.authToken);
        // this.refreshTokenCountDown(response.exp);
        this.auth.nextUser(this.user);
        this.loginCommunication.nextEvent(true);
      },
      (errorResponse) => {
        //error message if invalid contact number or password
        this.errorMessage = errorResponse.error.message;
        sessionStorage.clear();
      }
    );
  }

  registerUser() {
    this.user= new User();
    this.user.userName=this.registerForm.controls['username'].value;
    this.user.password=this.registerForm.controls['password'].value;
    this.user.emailId=this.registerForm.controls['emailId'].value;

    this.loginservice.register(this.user).subscribe(
      (response) => {
        this.errorMessage = null;
        this.authToken = response;
        this.authTokenService.refreshTokenCountDown(this.authToken);
        // this.refreshTokenCountDown(response.exp);
        this.auth.nextUser(this.user);
        this.loginCommunication.nextEvent(true);
      },
      (errorResponse) => {
        //error message if invalid contact number or password
        this.errorMessage = errorResponse.error.message;
        sessionStorage.clear();
      }
    );
  }

  checkPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  populateUser(authToken:AuthToken,emailId:string){
    this.user=new User();
    this.user.userId=authToken.userId;
    this.user.userName=authToken.username;
    this.user.emailId=emailId;
  }
}
