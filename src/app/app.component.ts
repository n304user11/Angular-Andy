import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { ActiveTabEnum } from "./Model/enum";
import { TabService } from "./services/tab.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public tabName = "Menu";
  public showMenuIcon = false;
  public setMenu = ActiveTabEnum.Menu;

  private subTab: Subscription = new Subscription();

  constructor(private tab: TabService) {
    this.subTab = this.tab.activeTab$.subscribe(activeTab => {
      switch (activeTab) {
        case ActiveTabEnum.MemberSearch:
          this.tabName = "Member Search";
          this.showMenuIcon = true;
          break;
        case ActiveTabEnum.SearchResult:
          this.tabName = "Search Results";
          this.showMenuIcon = true;
          break;
        default:
          this.tabName = "Menu";
          this.showMenuIcon = false;
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subTab?.unsubscribe();
  }

  setTab(tab: ActiveTabEnum): void {
    this.tab.activeTabSubject.next(tab);
  }
}
