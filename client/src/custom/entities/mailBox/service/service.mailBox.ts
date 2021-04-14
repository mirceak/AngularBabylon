import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceEntityBase } from '@custom/entities/base/service.entity.base';
import { ModelMailBox } from '../model/model.mailBox';

@Injectable({
  providedIn: 'root',
})
export class ServiceMailBox extends ServiceEntityBase<ModelMailBox> {
  constructor(http: HttpClient) {
    super(http, {
      pathNamePlural: 'mailboxes',
      pathName: 'mailbox',
    });
  }

  async reqMailBox(postData) {
    return await this.http.post(`api/${this.options.pathName}/reqMailBox`, postData).toPromise();
  }
  async getMailBox(postData) {
    return await this.http.post(`api/${this.options.pathName}/getMailBox`, postData).toPromise();
  }
  async setMailBox(postData) {
    return await this.http.post(`/api/${this.options.pathName}/setMailBox`, postData).toPromise();
  }
}
