import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceEntityBase } from '@custom/entities/base/service.entity.base';
import { ModelMailBox } from '../model/model.mailBox';

@Injectable({
  providedIn: 'root',
})
export class ServiceMailBox extends ServiceEntityBase<ModelMailBox> {
  constructor(public http: HttpClient) {
    super(http, {
      pathNamePlural: 'mailboxes',
      pathName: 'mailbox',
    });
  }

  async reqMailBox(postData: any): Promise<any> {
    return await this.http.post(`api/${super.options.pathName}/reqMailBox`, postData).toPromise();
  }
  async getMailBox(postData: any): Promise<any> {
    return await this.http.post(`api/${super.options.pathName}/getMailBox`, postData).toPromise();
  }
  async setMailBox(postData: any): Promise<any> {
    return await this.http.post(`/api/${super.options.pathName}/setMailBox`, postData).toPromise();
  }
}
