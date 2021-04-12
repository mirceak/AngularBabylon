import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceIdentity } from '../service/service.identity';
import { ServiceApi } from '@custom/services/utils/service.api';
import { BehaviorSubject } from 'rxjs';
import { ServiceSocket } from '@custom/services/utils/service.socket';

@Injectable({
  providedIn: 'root',
})
export class ProviderIdentity extends ServiceIdentity {
  constructor(
    http: HttpClient,
    public serviceSocket: ServiceSocket,
    private zone: NgZone
  ) {
    super(http);
  }

  async encryptData() {
    return new Promise(async (resolve) => {
      var encryptedBin = await (await this.test({ drama: true })).toPromise();
      this.serviceSocket.serviceApi.unloaded.next(null);
      console.log(33333, encryptedBin);
      resolve(null);
    });
  }

  async login(): Promise<any> {
    var postData: any = await this.serviceSocket.serviceApi.getRequestData(
      this.serviceSocket.serviceApi.token.value,
      this.serviceSocket.serviceApi.token
    );
    (
      await super.login({
        sessionJwt: this.serviceSocket.serviceApi.token.value.sessionJwt,
        rsaEncryptedAes: await this.serviceSocket.serviceApi.Cryptography.ab2str(
          postData.rsaEncryptedAes.encryptedAes
        ),
        aesEncrypted: await this.serviceSocket.serviceApi.Cryptography.ab2str(
          postData.aesEncrypted.ciphertext
        ),
      })
    )
      .toPromise()
      .then(async (data: any) => {
        var decryptedData = await this.serviceSocket.serviceApi.decryptServerData(
          data,
          postData.nextRsa
        );
        console.log(this.serviceSocket.serviceApi.token.value);
        this.serviceSocket.serviceApi.loggedIn.next(true);
      });
  }
}
