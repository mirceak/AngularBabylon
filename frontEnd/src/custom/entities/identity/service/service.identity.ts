import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseEntityService } from '@custom/entities/base/base.entity.service';
import { ModelIdentity } from '../model/model.identity';

@Injectable({
  providedIn: 'root',
})
export class ServiceIdentity extends BaseEntityService<ModelIdentity> {
  constructor(http: HttpClient) {
    super(http, {
      pathNamePlural: 'identities',
      pathName: 'identity',
    });
  }
  async login(postData: any): Promise<any> {
    return await this.http.post(`api/${this.options.pathName}/login`, postData).toPromise();
  }

  async account(postData: any): Promise<any> {
    return await this.http.post(`api/${this.options.pathName}/account`, postData).toPromise();
  }
}
