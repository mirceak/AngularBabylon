import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseEntityService } from '@custom/entities/base/base.entity.service';
import { ModelMailBox } from '../model/model.mailBox';

@Injectable({
  providedIn: 'root',
})
export class ServiceMailBox extends BaseEntityService<ModelMailBox> {
  constructor(public http: HttpClient) {
    super(http, {
      pathNamePlural: 'mailboxes',
      pathName: 'mailbox',
    });
  }

  async reqMailBox(postData: any): Promise<any> {
    return await this.http.post(`api/${this.options.pathName}/reqMailBox`, postData).toPromise();
  }
  async getMailBox(postData: any): Promise<any> {
    return await this.http.post(`api/${this.options.pathName}/getMailBox`, postData).toPromise();
  }
  async setMailBox(postData: any): Promise<any> {
    return await this.http.post(`/api/${this.options.pathName}/setMailBox`, postData).toPromise();
  }
}
