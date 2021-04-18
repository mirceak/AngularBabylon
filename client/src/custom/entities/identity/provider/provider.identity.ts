import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceIdentity } from '../service/service.identity';
import { ServiceSocket } from '@custom/services/utils/service.socket';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { ProviderReferral } from '@custom/entities/referral/provider/provider.referral';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';

@Injectable({
  providedIn: 'root',
})
export class ProviderIdentity extends ServiceIdentity {
  public recycleBin = new Subject<any>();
  public encryptingData = new BehaviorSubject<boolean>(false);
  public state = {
    mailBoxes: [],
    referrals: [],
    language: 'en',
  };

  constructor(
    http: HttpClient,
    public serviceSocket: ServiceSocket,
    private ProviderMailBox: ProviderMailBox,
    private ProviderReferral: ProviderReferral
  ) {
    super(http);

    this.recycleBin.subscribe(async (val) => {
      if (!this.serviceSocket.serviceApi.loggedIn.value) {
        return;
      }
      this.serviceSocket.serviceApi.serviceModals.showLoading({
        title: this.serviceSocket.serviceApi.translate.instant(
          'components.swal.loading'
        ),
        html: this.serviceSocket.serviceApi.translate.instant(
          'services.auth-identity.encrypting'
        ),
      });
      this.encryptingData.next(true);
      //must encrypt val first
      await this.encryptData(val).then(() => {
        this.serviceSocket.serviceApi.serviceModals.hideLoading();
        this.encryptingData.next(false);
      });
    });

    this.ProviderMailBox.mailBoxes.subscribe((val) => {
      if (!this.serviceSocket.serviceApi.loggedIn.value) {
        return;
      }
      this.state.mailBoxes.splice(0);
      this.state.mailBoxes.push(...val);
      this.recycleBin.next(this.state);
    });
    this.ProviderReferral.referrals.subscribe((val) => {
      if (!this.serviceSocket.serviceApi.loggedIn.value) {
        return;
      }
      this.state.referrals.splice(0);
      this.state.referrals.push(...val);
      this.recycleBin.next(this.state);
    });
  }

  async encryptData(postData) {
    return new Promise(async (resolve, reject) => {
      postData = await this.serviceSocket.serviceApi.getRequestData(
        postData,
        this.serviceSocket.serviceApi.token
      );
      await super
        .encrypt({
          sessionJwt: this.serviceSocket.serviceApi.token.value.sessionJwt,
          rsaEncryptedAes: await this.serviceSocket.serviceApi.Cryptography.ab2str(
            postData.rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: await this.serviceSocket.serviceApi.Cryptography.ab2str(
            postData.aesEncrypted.ciphertext
          ),
        })
        .then(async (data: any) => {
          if (!data) {
            return reject();
          }
          var decryptedData: any = await this.serviceSocket.serviceApi.decryptServerData(
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
          return resolve(null);
        });
    });
  }

  async updateAccount(postData) {
    return new Promise(async (resolve, reject) => {
      var postData: any = await this.serviceSocket.serviceApi.getRequestData(
        postData,
        this.serviceSocket.serviceApi.token
      );
      postData.oldPassword = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.oldPassword
      );
      postData.password = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.password
      );
      postData.oldPin = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.oldPin
      );
      postData.pin = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.pin
      );
      await super
        .account({
          sessionJwt: this.serviceSocket.serviceApi.token.value.sessionJwt,
          rsaEncryptedAes: await this.serviceSocket.serviceApi.Cryptography.ab2str(
            postData.rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: await this.serviceSocket.serviceApi.Cryptography.ab2str(
            postData.aesEncrypted.ciphertext
          ),
        })
        .then(async (data: any) => {
          if (!data) {
            return reject();
          }
          await this.serviceSocket.serviceApi.decryptServerData(
            data,
            postData.nextRsa
          );
          resolve(null);
        });
    });
  }

  async login(postData): Promise<any> {
    return new Promise(async (resolve, reject) => {
      var pubkData = JSON.parse(localStorage.getItem('sessionToken')).nextRsa;
      var nextRsa = await this.serviceSocket.serviceApi.Cryptography.generateRsaKeys(
        'jwk'
      );
      postData.email = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.email
      );
      postData.password = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.password
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
      await super
        .login({
          encryptedDataWithSessionToken: localStorage.getItem('encryptedState'),
          rsaEncryptedAes: this.serviceSocket.serviceApi.Cryptography.ab2str(
            rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: this.serviceSocket.serviceApi.Cryptography.ab2str(
            aesEncrypted.ciphertext
          ),
        })
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
          if (!data.valid) {
            localStorage.setItem('encryptedState', decryptedData.encryptedData);
            localStorage.setItem(
              'sessionToken',
              JSON.stringify(decryptedData.resumeToken)
            );
            this.serviceSocket.serviceApi.sessionToken.next(
              decryptedData.resumeToken
            );
            this.serviceSocket.serviceApi.serviceModals.hideLoading();
            reject();
          } else {
            localStorage.setItem(
              'encryptedState',
              decryptedData.data.normalResponse.encryptedData
            );
            localStorage.setItem(
              'sessionToken',
              JSON.stringify(decryptedData.data.normalResponse.resumeToken)
            );
            this.serviceSocket.serviceApi.sessionToken.next(
              decryptedData.data.normalResponse.resumeToken
            );
            this.serviceSocket.serviceApi.token.next(
              this.serviceSocket.serviceApi.jwtHelper.decodeToken(
                decryptedData.token
              )
            );
            var unlockedData: any = decryptedData.data.unlockedData;
            Object.assign(this.state, unlockedData);
            this.ProviderMailBox.mailBoxes.next(this.state.mailBoxes);
            this.ProviderReferral.referrals.next(this.state.referrals);
            this.serviceSocket.serviceApi.loggedIn.next(true);
            this.serviceSocket.serviceApi.zone.run(() => {
              this.serviceSocket.serviceApi.serviceModals.hideLoading();
              this.serviceSocket.serviceApi.router.navigate(['/']);
              resolve(null);
            });
          }
        });
    });
  }
}
