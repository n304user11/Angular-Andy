import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, retry } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusUrl = 'http://localhost:8000/api';
  
  public serverStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public readonly http: HttpClient) { }

  // Get the status
  getStatus(): Observable<string> {
    const url = `${this.statusUrl}/status`
    return this.http.get<string>(url)
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
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}