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
    return this.http.post('api/reqMailBox', postData);
  }
  getMailBox(postData) {
    return this.http.post('api/getMailBox', postData);
  }
  setMailBox(postData) {
    return this.http.post('/api/setMailBox', postData);
  }
}
