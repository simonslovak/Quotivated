import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class XcolorsService {

  constructor(private http: HttpClient) {}

  getRandomColour(): Observable<any> {
    const url = `${environment.xColors.baseUrl}/api/random`; 
    console.log(url);
    return this.http.get<any>(url);
  }
}
