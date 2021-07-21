import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActiveTabEnum } from '../Model/enum';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  public activeTabSubject = new Subject<ActiveTabEnum>();

  constructor() {
  }

  getTab(): Observable<any> {
    return this.activeTabSubject.asObservable();
  }
}
