import { MemberService } from './../services/member.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveTabEnum } from '../Model/enum';
import { TabService } from '../services/tab.service';
import { Member } from '../Model/member';
import * as moment from 'moment';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
  private foo: Member[] = [];
  memberSearchForm = this.fb.group({
    serviceDate: new FormControl('', Validators.required),
    policyNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    memberCardNumber: new FormControl('')
  });

  constructor(
    private tab: TabService,
    private fb: FormBuilder,
    private router: Router,
    private memberService: MemberService
  ) {
    this.tab.activeTabSubject.next(ActiveTabEnum.MemberSearch)
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    return this.memberService.fetchMembers().subscribe((data: Member[]) => {
      this.foo = data;

    })
  }

  searchMember(): void {
    const policyNumber = this.memberSearchForm.get('policyNumber')?.value;
    const serviceDate = moment(this.memberSearchForm.get('serviceDate')?.value)
    const bar = this.foo.filter(x =>
      x.policyNumber.includes(policyNumber)
      && moment(x.dataOfBirth, "DD/MM/YYYY") < serviceDate
    )

    this.memberService.filteredMembers$.next(bar)
    this.router.navigateByUrl('/search-result');
    this.tab.activeTabSubject.next(ActiveTabEnum.SearchResult)
  }

  reset(): void {
    this.memberSearchForm.reset();
  }

}