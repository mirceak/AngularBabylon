import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ServiceEntityBase } from '@custom/entities/base/service.entity.base';
import { ModelReferral } from '@custom/entities/referral/model/model.referral';

@Injectable({
  providedIn: 'root',
})
export class ServiceReferral extends ServiceEntityBase<ModelReferral> {
  constructor(http: HttpClient) {
    super(http, {
      pathNamePlural: 'referrals',
      pathName: 'referral',
    });
  }

  async reqSignup(postData) {
    return this.http.post(`api/${this.options.pathName}/reqSignup`, postData);
  }
}
