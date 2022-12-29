import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotableService {
  constructor(private http: HttpClient) { }

  getRandomQuote(): Observable<any> {
    const url = `${environment.quotable.baseUrl}/random`; 
    console.log(url);
    return this.http.get<any>(url);
  }

  getColor(): Observable<any> {
    const url = `${environment.xColors.baseUrl}/api/random`; 
    console.log(url);
    return this.http.get<any>(url);
  }
}
