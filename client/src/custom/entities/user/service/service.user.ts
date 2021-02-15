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
}
