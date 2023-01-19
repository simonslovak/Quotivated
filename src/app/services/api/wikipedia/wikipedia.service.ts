import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  constructor(private http: HttpClient) {}

  getAuthorInfo(): Observable<any> {    
    const url = `${environment.wikipedia.baseUrl}`;    
    console.log(url);
    return this.http.get<any>(url)
  } 
}
