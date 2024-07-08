import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {StorageService} from "./storage.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiUrl =environment.beApiUrl;

  httpOptions: any;
  token : any;

  constructor(private http: HttpClient, private storageService : StorageService) {
    this.token = storageService.getUser().access_token;
    console.log(this.token)
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')!)?.accessToken}`,
      }),
      "Access-Control-Allow-Origin": `${environment.beApiUrl}`,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      reportProgress: true,
      responseType: 'json',
    };
  }

  upload(file: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')!)?.accessToken}`,
    });
    const formData: FormData = new FormData();
    formData.append('img', file);
    const req = new HttpRequest('POST', `${this.apiUrl}/shop/user/change-profile/avt`, formData,{
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);

    // return this.http.post<any>(`${this.apiUrl}/shop/user/change-profile/avt`,formData,this.httpOptions);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/files`);
  }
}
