import { Member } from "./../Model/member";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class MemberService {
  public filteredMembers$: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>([]);
  private readonly baseUrl =
    "https://rcvp3-api.azurewebsites.net/members?policyNumber=";

  constructor(private http: HttpClient) {}

  fetchMembers(): Observable<Member[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Member[]>(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
