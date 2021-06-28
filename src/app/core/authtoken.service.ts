import { Injectable } from '@angular/core';
import { AuthToken } from '../models/AuthToken';
import { HttpClient } from '@angular/common/http';
import {  User } from '../models/User';
import { LoginService } from '../services/login.service';
import { AuthService } from './auth.service';
import { LoginpageCommunicationService } from './loginpage-communication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  authToken: AuthToken = new AuthToken();
  constructor(private auth: AuthService,private loginservice: LoginService, private loginCommunication:LoginpageCommunicationService) {
    
  }

  // to get updated refreshtoken
getRefreshToken(userId:string){
  console.log("refresh");
  this.loginservice.validateRefresh(userId).subscribe( (response) => {
    this.authToken = response;
    let user=this.populateUser(this.authToken);
    this.refreshTokenCountDown(this.authToken);
    this.auth.nextUser(user);
    this.loginCommunication.nextEvent(true);
    console.log("refresh new",user,this.authToken);
  },
  (errorResponse) => {
    this.loginCommunication.nextEvent(false);
    sessionStorage.clear();
  });
}

//countdown for refresh token
  refreshTokenCountDown(authToken: AuthToken){
    let countDown=new Date(authToken.exp).getTime()-new Date().getTime();
    console.log("expirey date",authToken.exp ,Date.now(),new Date(authToken.exp).getTime()-new Date().getTime());
    //call settimeout 20sec before exp
    setTimeout(()=>this.getRefreshToken(authToken.userId),countDown-40000);
  }

  populateUser(authToken:AuthToken){
    let user=new User();
    user.userId=authToken.userId;
    user.userName=authToken.username;
    return user;
  }
}
