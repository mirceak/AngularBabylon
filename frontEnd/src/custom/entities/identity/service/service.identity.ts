import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceEntityBase } from '@custom/entities/base/service.entity.base';
import { ModelIdentity } from '../model/model.identity';

@Injectable({
  providedIn: 'root',
})
export class ServiceIdentity extends ServiceEntityBase<ModelIdentity> {
  constructor(http: HttpClient) {
    super(http, {
      pathNamePlural: 'identities',
      pathName: 'identity',
    });
  }
  async encrypt(postData: any): Promise<any> {
    return await this.http.post(`api/${this.options.pathName}/encrypt`, postData).toPromise();
  }

  async login(postData: any): Promise<any> {
    return await this.http.post(`api/${this.options.pathName}/login`, postData).toPromise();
  }

  async account(postData: any): Promise<any> {
    return await this.http.post(`api/${this.options.pathName}/account`, postData).toPromise();
  }
}
