import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceReferral } from '@custom/entities/referral/service/service.referral';
import { ServiceApi } from '@custom/services/utils/service.api';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderReferral extends ServiceReferral {
  referrals = new BehaviorSubject<any>([]);

  constructor(
    http: HttpClient,
    private serviceApi: ServiceApi,
    private zone: NgZone
  ) {
    super(http);
    this.serviceApi.loggedIn.subscribe((val) => {
      if (!val) {
        this.referrals.next([]);
      }
    });
  }

  async reqSignup(postData): Promise<any> {
    return new Promise(async (resolve) => {
      let originalEmail = postData.email;
      postData.email = await this.serviceApi.Cryptography.getShaHash(
        postData.email
      );
      var reqData = await this.serviceApi.getRequestData(
        postData,
        this.serviceApi.token
      );
      await super
        .reqSignup({
          sessionJwt: this.serviceApi.token.value.sessionJwt,
          rsaEncryptedAes: await this.serviceApi.Cryptography.ab2str(
            reqData.rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: await this.serviceApi.Cryptography.ab2str(
            reqData.aesEncrypted.ciphertext
          ),
        })
        .then(async (data: any) => {
          var decryptedData = await this.serviceApi.decryptServerData(
            data,
            reqData.nextRsa
          );
          decryptedData.decryptedToken.data.email = originalEmail;
          this.zone.run(() => {
            this.referrals.next([
              ...this.referrals.value.filter((referral) => {
                return referral.email !== decryptedData.decryptedToken.data.email;
              }),
              decryptedData.decryptedToken.data,
            ]);
            resolve(null);
          });
        });
    });
  }
}
