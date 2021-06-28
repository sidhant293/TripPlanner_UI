import { Injectable } from '@angular/core';
import {  BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  sessionUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  user: User;
  constructor(private http: HttpClient) {
    this.loadSessionUser();
  }


  loadSessionUser() {
        this.user = new User();
        this.user.userName = null;       
      }
    nextUser(data:User){
        this.user = data;
        this.sessionUser.next(this.user);
    }
}
