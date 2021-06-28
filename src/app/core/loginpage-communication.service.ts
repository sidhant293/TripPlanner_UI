import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginpageCommunicationService {
  pageEvent:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(true);
  constructor() { }

   nextEvent(data:boolean){
      this.pageEvent.next(data);
   }
}
