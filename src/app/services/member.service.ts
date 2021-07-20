import { Member } from "./../Model/member";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { retry, catchError } from 'rxjs/operators';
import { StatusService } from "../shared/status.service";

@Injectable({
  providedIn: "root",
})
export class MemberService extends StatusService {
  public filteredMembers$: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>([]);
  private readonly baseUrl = "https://rcvp3-api.azurewebsites.net/members?policyNumber=";
  private readonly lowdbUrl = "http://localhost:8000/api";

  constructor(http: HttpClient) {
    super(http)
  }

  fetchMembers(): Observable<Member[]> {
    const url = `${this.lowdbUrl}/member`
    const status = this.serverStatus.getValue();

    if (status) {
      return this.http.get<Member[]>(url)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    } else {
      return this.http.get<Member[]>(this.baseUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
    
  }
}
