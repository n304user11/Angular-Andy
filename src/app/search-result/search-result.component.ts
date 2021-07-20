import { Component, OnInit } from '@angular/core';
import { ActiveTabEnum } from '../Model/enum';
import { Member } from '../Model/member';
import { MemberService } from '../services/member.service';
import { TabService } from '../services/tab.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  public resultMember!: Member[];

  constructor(
    private tab: TabService,
    private memberService: MemberService
    ) {
    this.tab.activeTabSubject.next(ActiveTabEnum.SearchResult)
   }

  ngOnInit(): void {
    this.memberService.filteredMembers$.subscribe(members => {
      this.resultMember = members;
    })
  }

}
