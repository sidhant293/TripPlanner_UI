import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { LoginpageCommunicationService } from '../core/loginpage-communication.service';
import { User } from '../models/User';
import { AuthTokenService } from '../core/authtoken.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  signInButton: boolean = true;
  userName: string;
  loggedIn: boolean;

  constructor(private loginCommunication: LoginpageCommunicationService, private auth: AuthService, private authTokenService:AuthTokenService) { }
  ngOnInit(): void {
    this.checkForRefreshToken();
    this.auth.sessionUser.subscribe(data => {
      this.userName = data.userName;
      if (this.userName != null) {
        this.loggedIn = true;
        sessionStorage.setItem("TripPlannerUser",data.userId);
      }else{
        this.loggedIn=false;
      }
      this.signInButton=true;
    });
  }
  toogleLoginButton() {
    this.signInButton = !this.signInButton;
    this.loginCommunication.nextEvent(this.signInButton);
  }

  logOut(){
    sessionStorage.clear();
    this.auth.nextUser(new User());
  }

  checkForRefreshToken(){
    let userId=sessionStorage.getItem("TripPlannerUser");
    // console.log("userId",userId,document.cookie.indexOf("refreshToken"),this.getCookie("refreshToken"));
    if( userId!=null){
      this.authTokenService.getRefreshToken(userId);
    }
  }

}
