import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginpageCommunicationService } from '../core/loginpage-communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //unsplash urls, images are loaded according to these keywords
  images = ['himachal pradesh', 'himachal', 'kasol', 'manali', 'mountain', 'dharamshala', 'shimla']
    .map((place) => `https://source.unsplash.com/1600x900/?${place}`);

  signIn: boolean ;
  setDisplay:boolean=true;
  elem;

  constructor(config: NgbCarouselConfig, private loginCommunication: LoginpageCommunicationService) {
    // customize default values of carousels used by this component tree
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.pauseOnFocus = false;
    config.animation = false;
    this.signIn=false 
   
  }

  ngOnInit(): void {
    this.elem = document.documentElement;
    // this.openFullscreen();
    this.loginCommunication.pageEvent.subscribe(data => {
      this.signIn = !data;
      this.changeDisplay();
    });
  }

  changeDisplay() {
    if(this.signIn){
      this.setDisplay=!this.setDisplay;
    }else{
      setTimeout(()=>{
        this.setDisplay=!this.setDisplay;
    }, 500);
    }
  }

  // openFullscreen() {
  //   if (this.elem.requestFullscreen) {
  //     this.elem.requestFullscreen();
  //   } else if (this.elem.mozRequestFullScreen) {
  //     /* Firefox */
  //     this.elem.mozRequestFullScreen();
  //   } else if (this.elem.webkitRequestFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     this.elem.webkitRequestFullscreen();
  //   } else if (this.elem.msRequestFullscreen) {
  //     /* IE/Edge */
  //     this.elem.msRequestFullscreen();
  //   }
  // }

  // /* Close fullscreen */
  // closeFullscreen() {
  //   if (this.document.exitFullscreen) {
  //     this.document.exitFullscreen();
  //   } else if (this.document.mozCancelFullScreen) {
  //     /* Firefox */
  //     this.document.mozCancelFullScreen();
  //   } else if (this.document.webkitExitFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     this.document.webkitExitFullscreen();
  //   } else if (this.document.msExitFullscreen) {
  //     /* IE/Edge */
  //     this.document.msExitFullscreen();
  //   }
  // }

}
