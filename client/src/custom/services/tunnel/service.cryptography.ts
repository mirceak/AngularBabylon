import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceCryptography {
  constructor(private http: HttpClient) {}

  requestLogin(postData) {
    return this.http.post('api/preLogin', postData);
  }
  login(postData) {
    return this.http.post('api/login', postData);
  }
  reqSignup(postData) {
    return this.http.post('api/reqSignup', postData);
  }
}
