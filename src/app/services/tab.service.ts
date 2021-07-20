import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActiveTabEnum } from '../Model/enum';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  public activeTabSubject = new Subject<ActiveTabEnum>();
  public activeTab$: Observable<ActiveTabEnum>;

  constructor() {
    this.activeTab$ = this.activeTabSubject.asObservable();
   }
}
