import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult } from 'src/app/models/quotable.model';
import { ApiResults } from 'src/app/models/quotable.model';

@Injectable({
  providedIn: 'root'
})
export class QuotableService {
  constructor(private http: HttpClient) {}

  getRandomQuote(page=1): Observable<ApiResult> {
    const url = `${environment.quotable.baseUrl}/random`; 
    console.log(url);
    return this.http.get<ApiResult>(url);
  }
  
  getSpecificQuotes(page=1, filterItem="", expression=""): Observable<ApiResults> {
    const url = `${environment.quotable.baseUrl}/quotes?query=${filterItem}&fields=${expression}`; 
    console.log(url);
    return this.http.get<ApiResults>(url);
  }
}
