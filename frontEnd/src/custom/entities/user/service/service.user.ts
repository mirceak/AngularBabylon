import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseEntityService } from '@custom/entities/base/base.entity.service';
import { ModelUser } from '@custom/entities/user/model/model.user';

@Injectable({
  providedIn: 'root',
})
export class ServiceUser extends BaseEntityService<ModelUser> {
  constructor(http: HttpClient) {
    super(http, {
      pathNamePlural: 'users',
      pathName: 'user',
    });
  }

  async requestLogin(postData: any): Promise<any> {
    return await this.http
      .post(`api/${this.options.pathName}/preLogin`, postData)
      .toPromise();
  }
  async login(postData: any): Promise<any> {
    return await this.http
      .post(`api/${this.options.pathName}/login`, postData)
      .toPromise();
  }
  async requestRegister(postData: any): Promise<any> {
    return await this.http
      .post(`api/${this.options.pathName}/preRegister`, postData)
      .toPromise();
  }
  async register(postData: any): Promise<any> {
    return await this.http
      .post(`api/${this.options.pathName}/register`, postData)
      .toPromise();
  }
}
