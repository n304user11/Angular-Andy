import { Component, OnInit } from '@angular/core';
import { ActiveTabEnum } from '../Model/enum';
import { TabService } from '../services/tab.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public searchResult = ActiveTabEnum.SearchResult;
  public memberSearch = ActiveTabEnum.MemberSearch;

  constructor(private tab: TabService) { }

  ngOnInit(): void {
  }

  setTab(tab: ActiveTabEnum): void {
    this.tab.activeTab.next(tab)
  }

}
