import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceEntityBase } from '@custom/entities/base/service.entity.base';
import { ModelUser } from '@custom/entities/user/model/model.user';

@Injectable({
  providedIn: 'root',
})
export class ServiceUser extends ServiceEntityBase<ModelUser> {
  constructor(http: HttpClient) {
    super(http, {
      pathNamePlural: 'users',
      pathName: 'user',
    });
  }

  requestLogin(postData) {
    return this.http.post('api/preLogin', postData);
  }
  login(postData) {
    return this.http.post('api/login', postData);
  }
  requestRegister(postData) {
    return this.http.post('api/preRegister', postData);    
  }
  register(postData) {
    return this.http.post('api/register', postData);    
  }
}
