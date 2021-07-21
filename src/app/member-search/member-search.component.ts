import { MemberService } from './../services/member.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveTabEnum } from '../Model/enum';
import { TabService } from '../services/tab.service';
import { Member } from '../Model/member';
import * as moment from 'moment';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {
  private memberList: Member[] = [];
  memberSearchForm!: FormGroup;

  constructor(
    private tab: TabService,
    private fb: FormBuilder,
    private router: Router,
    private statusService: StatusService,
    private memberService: MemberService
  ) {
    this.tab.activeTabSubject.next(ActiveTabEnum.MemberSearch);
  }

  ngOnInit(): void {
    this.initMemberSearchForm();
    this.loadMembers();
  }

  initMemberSearchForm(): void {
    this.memberSearchForm = this.fb.group({
      serviceDate: new FormControl('', Validators.required),
      policyNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      memberCardNumber: new FormControl('')
    });
  }

  loadMembers(): void {
    this.memberService.fetchMembers().subscribe((data: Member[]) => {
      this.memberList = data;
    })
  }

  searchMember(): void {
    const policyNumber = this.memberSearchForm.get('policyNumber')?.value;
    const serviceDate = moment(this.memberSearchForm.get('serviceDate')?.value);
    const memberCardNumber = this.memberSearchForm.get('memberCardNumber')?.value;

    const filteredMembers = this.memberList.filter(x => {
      if (x.policyNumber === policyNumber && moment(x.dataOfBirth, "DD/MM/YYYY") < serviceDate) {
        if (memberCardNumber && memberCardNumber !== "") {
          if (x.memberCardNumber === memberCardNumber) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    }

    )

    this.memberService.filteredMembers$.next(filteredMembers)
    this.router.navigateByUrl('/search-result');
    this.tab.activeTabSubject.next(ActiveTabEnum.SearchResult)
  }

  reset(): void {
    this.memberSearchForm.reset();
  }

}