import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private _http: HttpClient) {

  }

  public static serverEndpoint = 'http://localhost/Angular-pz/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Token': !!localStorage.getItem('token') ? localStorage.getItem('token') : ''
    })
  };


  public get(url) {
    return this._http.get(ApiService.serverEndpoint + url, this.httpOptions);
  }

  public post(url, data) {
    return this._http.post(ApiService.serverEndpoint + url, data, this.httpOptions);
  }

  public put(url, data) {

    return this._http.put(ApiService.serverEndpoint + url, data, this.httpOptions);
  }

  public patch(url, data) {
    return this._http.patch(ApiService.serverEndpoint + url, data, this.httpOptions);
  }

  public delete(url) {
    return this._http.delete(ApiService.serverEndpoint + url, this.httpOptions);
  }

}
