import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseEntityService } from '@custom/entities/base/base.entity.service';
import { ModelReferral } from '@custom/entities/referral/model/model.referral';

@Injectable({
  providedIn: 'root',
})
export class ServiceReferral extends BaseEntityService<ModelReferral> {
  constructor(public http: HttpClient) {
    super(http, {
      pathNamePlural: 'referrals',
      pathName: 'referral',
    });
  }

  async reqSignup(postData: any): Promise<any> {
    return await this.http.post(`api/${this.options.pathName}/reqSignup`, postData).toPromise();
  }
}
