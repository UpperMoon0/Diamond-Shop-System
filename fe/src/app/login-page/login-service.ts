import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  login(formData: any): Observable<any> {
    return this.http.post('http://localhost:8081/auth/login', formData);
  }
}
