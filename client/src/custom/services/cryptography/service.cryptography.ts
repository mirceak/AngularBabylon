import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUser } from '@custom/entities/user/service/service.user';

@Injectable({
  providedIn: 'root',
})
export class ServiceCryptography {
  constructor(private http: HttpClient, private serviceUser: ServiceUser) {}

  requestLogin(postData) {
    return this.http.post('api/preLogin', postData);
  }
  login(postData) {
    return this.http.post('api/login', postData);
  }
  reqContact(postData) {
    return this.http.post('api/reqContact', postData);
  }
  getContact(postData) {
    return this.http.post('api/getContact', postData);
  }
  setContact(postData) {
    return this.http.post('api/setContact', postData);
  }
  reqSignup(postData) {
    return this.http.post('api/reqSignup', postData);
  }
  requestRegister(postData) {
    return this.http.post('api/preRegister', postData);    
  }
  register(postData) {
    return this.http.post('api/register', postData);    
  }
}
