import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActiveTabEnum } from '../Model/enum';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  public activeTab = new Subject<ActiveTabEnum>();
  public subActiveTab = this.activeTab.asObservable(); 

  constructor() { }
}
