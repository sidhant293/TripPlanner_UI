import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthToken} from '../models/AuthToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<AuthToken> {
    return <Observable<AuthToken>>this.http.post<AuthToken>(environment.loginUrl, data);  
  }

  register(data: any): Observable<AuthToken> {
    return <Observable<AuthToken>>this.http.post<AuthToken>(environment.registerUrl, data);  
  }

  validateRefresh(userId:string): Observable<AuthToken> {
    return <Observable<AuthToken>>this.http.get<AuthToken>(environment.refreshTokenUrl+`/${userId}`);  
  }
}
