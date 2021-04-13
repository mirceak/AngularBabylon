import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceIdentity } from '../service/service.identity';
import { ServiceSocket } from '@custom/services/utils/service.socket';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { ProviderReferral } from '@custom/entities/referral/provider/provider.referral';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderIdentity extends ServiceIdentity {
  public recycleBin = new Subject<any>();
  public state = {
    mailboxes: [],
    referrals: [],
  };

  constructor(
    http: HttpClient,
    public serviceSocket: ServiceSocket,
    private ProviderMailBox: ProviderMailBox,
    private ProviderReferral: ProviderReferral,
    private zone: NgZone
  ) {
    super(http);

    this.recycleBin.subscribe(async (val) => {
      //must encrypt val first
      await this.encryptData(val);
    });

    this.ProviderMailBox.mailBoxes.subscribe((val) => {
      if (!this.serviceSocket.serviceApi.loggedIn.value) {
        return;
      }
      this.state.mailboxes.splice(0);
      this.state.mailboxes.push(...val);
      this.recycleBin.next(JSON.stringify(this.state));
    });
    this.ProviderReferral.referrals.subscribe((val) => {
      if (!this.serviceSocket.serviceApi.loggedIn.value) {
        return;
      }
      this.state.referrals.splice(0);
      this.state.referrals.push(...val);
      this.recycleBin.next(JSON.stringify(this.state));
    });
  }

  async encryptData(postData) {
    var postData: any = await this.serviceSocket.serviceApi.getRequestData(
      postData,
      this.serviceSocket.serviceApi.token
    );
    (
      await super.encrypt({
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
        localStorage.setItem(
          'encryptedState',
          decryptedData.decryptedToken.data.encryptedData
        );
        localStorage.setItem(
          'sessionToken',
          JSON.stringify(decryptedData.decryptedToken.data.resumeToken)
        );
      });
  }

  async login(postData): Promise<any> {
    var pubkData = JSON.parse(localStorage.getItem('sessionToken')).nextRsa;
    var nextRsa = await this.serviceSocket.serviceApi.Cryptography.generateRsaKeys(
      'jwk'
    );
    var rsaEncryptedAes = await this.serviceSocket.serviceApi.Cryptography.getRsaEncryptedAesKey(
      pubkData
    );
    var aesEncrypted = await this.serviceSocket.serviceApi.Cryptography.aesEncrypt(
      JSON.stringify({
        nextRsa: nextRsa.pubkData,
        ...postData,
      }),
      rsaEncryptedAes.aesKey,
      JSON.parse(localStorage.getItem('sessionToken')).nextRsa
    );
    (
      await super.login({
        encryptedData: localStorage.getItem('encryptedState'),
        rsaEncryptedAes: this.serviceSocket.serviceApi.Cryptography.ab2str(
          rsaEncryptedAes.encryptedAes
        ),
        aesEncrypted: this.serviceSocket.serviceApi.Cryptography.ab2str(
          aesEncrypted.ciphertext
        ),
      })
    )
      .toPromise()
      .then(async (data: any) => {
        data.rsaEncryptedAes = this.serviceSocket.serviceApi.Cryptography.str2ab(
          data.rsaEncryptedAes
        );
        data.aesEncrypted = this.serviceSocket.serviceApi.Cryptography.str2ab(
          data.aesEncrypted
        );
        var decryptedAes = await this.serviceSocket.serviceApi.Cryptography.rsaDecrypt(
          data.rsaEncryptedAes,
          nextRsa.privateKey
        );
        var aesKey = await this.serviceSocket.serviceApi.Cryptography.importAesKey(
          decryptedAes
        );
        var decryptedData: any = JSON.parse(
          await this.serviceSocket.serviceApi.Cryptography.aesDecrypt(
            data.aesEncrypted,
            aesKey,
            nextRsa.pubkData
          )
        );
        localStorage.setItem('encryptedState', decryptedData.encryptedData);
        localStorage.setItem(
          'sessionToken',
          JSON.stringify(decryptedData.resumeToken)
        );
        console.log(decryptedData.resumeToken);
        this.serviceSocket.serviceApi.sessionToken.next(decryptedData.resumeToken);
        this.serviceSocket.serviceApi.loggedIn.next(true);
      });
  }
}
