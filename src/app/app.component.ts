import { Component } from '@angular/core';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActiveTabEnum } from './Model/enum';
import { TabService } from './services/tab.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Southern-Cross-Andy';
  public tabName = 'Menu';
  public showMenuIcon = false;
  public setMnu = ActiveTabEnum.Menu;

  private subTab: Subscription = new Subscription();

  constructor(private tab: TabService) { }

  ngOnInit() {
    this.subTab = this.tab.subActiveTab.subscribe(activeTab => {
      switch (activeTab) {
        case ActiveTabEnum.MemberSearch:
          this.tabName = 'Member Search';
          this.showMenuIcon = true;
          break;
        case ActiveTabEnum.SearchResult:
          this.tabName = 'Search Results';
          this.showMenuIcon = true;
          break;
        default:
          this.tabName = 'Menu'
          this.showMenuIcon = false;
      }
    })
  }

  ngOnDestroy() {
    this.subTab?.unsubscribe()
  }

  setTab(tab: ActiveTabEnum): void {
    this.tab.activeTab.next(tab)
  }
}
