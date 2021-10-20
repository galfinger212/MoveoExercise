import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getPage(pageNumber: number): Observable<any> {
    var url = `https://randomuser.me/api/?inc=gender,name,picture,email,dob,location&page=${pageNumber}&results=10&seed=abc`;
    return this.http.get<any>(url);
  }
}
