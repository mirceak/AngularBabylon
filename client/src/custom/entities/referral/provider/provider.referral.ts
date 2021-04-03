import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceReferral } from '@custom/entities/referral/service/service.referral';
import { ServiceApi } from '@custom/services/utils/service.api';

@Injectable({
  providedIn: 'root',
})
export class ProviderReferral extends ServiceReferral {
  referrals;

  constructor(
    http: HttpClient,
    private serviceApi: ServiceApi,
    private zone: NgZone
  ) {
    super(http);

    this.referrals = localStorage.getItem('referrals');
    if (!this.referrals) {
      this.referrals = '[]';
      localStorage.setItem('referrals', this.referrals);
    }
    this.referrals = JSON.parse(this.referrals);
  }

  async reqSignup(postData): Promise<any> {
    return new Promise(async (resolve) => {
      var reqData = await this.serviceApi.getRequestData(
        postData,
        this.serviceApi.token
      );
      (
        await super.reqSignup({
          sessionJwt: this.serviceApi.token.sessionJwt,
          rsaEncryptedAes: await this.serviceApi.Cryptography.ab2str(
            reqData.rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: await this.serviceApi.Cryptography.ab2str(
            reqData.aesEncrypted.ciphertext
          ),
        })
      )
        .toPromise()
        .then(async (data: any) => {
          var decryptedData = await this.serviceApi.decryptServerData(
            data,
            reqData.nextRsa
          );
          this.zone.run(() => {
            this.referrals.push(decryptedData.decryptedToken.data);
            localStorage.setItem(
              'referrals',
              JSON.stringify(this.referrals)
            );
            resolve(null);
          });
        });
    });
  }
}
