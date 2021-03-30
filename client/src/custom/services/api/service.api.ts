import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceUser } from '@custom/entities/user/service/service.user';

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {
  constructor(private http: HttpClient, private serviceUser: ServiceUser) {}

  requestLogin(postData) {
    return this.http.post('api/preLogin', postData);
  }
  login(postData) {
    return this.http.post('api/login', postData);
  }
  reqMailBox(postData) {
    return this.http.post('api/reqMailBox', postData);
  }
  getMailBox(postData) {
    return this.http.post('api/getMailBox', postData);
  }
  setMailBox(postData) {
    return this.http.post('/api/setMailBox', postData);
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
