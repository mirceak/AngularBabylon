import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceTunnel {
  constructor(private http: HttpClient) {}

  async requestLogin(postData) {
    return this.http.post('api/preLogin', postData);
  }
  async login(postData) {
    return this.http.post('api/login', postData);
  }
}
