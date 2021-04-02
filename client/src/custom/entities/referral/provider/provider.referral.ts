import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceReferral } from '@custom/entities/referral/service/service.referral';

@Injectable({
  providedIn: 'root',
})
export class ProviderReferral extends ServiceReferral {
  constructor(http: HttpClient) {
    super(http);
  }

  reqSignup(postData) {
    return super.reqSignup(postData);
  }
}
