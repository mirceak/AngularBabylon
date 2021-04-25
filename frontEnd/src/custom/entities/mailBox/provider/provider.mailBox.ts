import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceMailBox } from '../service/service.mailBox';
import { ServiceApi } from '@custom/services/utils/service.api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderMailBox extends ServiceMailBox {
  mailBoxes = new BehaviorSubject<any>([]);
  mailBoxObservable = new BehaviorSubject<any>({});

  constructor(
    http: HttpClient,
    private serviceApi: ServiceApi,
    private zone: NgZone
  ) {
    super(http);

    this.serviceApi.loggedIn.subscribe((val) => {
      if (!val) {
        this.mailBoxes.next([]);
      }
    });
  }

  async updateMailBox(mailBox: any, remoteMailBox: any): Promise<any> {
    mailBox.messages = remoteMailBox.messages || mailBox.messages;

    if (
      mailBox.remote === false &&
      mailBox.secret3 === null &&
      mailBox.messages.remote !== null
    ) {
      this.serviceApi.serviceModals.showToast({
        status: 'success',
        statusMessage: this.serviceApi.translate.instant(
          'components.toastr.success'
        ),
        title: this.serviceApi.translate.instant(
          'pages.mailBox.acceptedRemote',
          {
            name: mailBox.name,
          }
        ),
      });
      const mailBoxKey = await this.serviceApi.Cryptography.importRsaKey(
        mailBox.privkData
      );
      const rsaDecryptedAesKey = await this.serviceApi.Cryptography.rsaDecrypt(
        await this.serviceApi.Cryptography.str2ab(mailBox.messages.remote[0]),
        mailBoxKey
      );
      const aesKey = await this.serviceApi.Cryptography.importAesKey(
        rsaDecryptedAesKey
      );
      const aesDecrypted = JSON.parse(
        await this.serviceApi.Cryptography.aesDecrypt(
          await this.serviceApi.Cryptography.str2ab(mailBox.messages.remote[1]),
          aesKey,
          mailBox.pubkData
        )
      );
      mailBox.aesPubkData = rsaDecryptedAesKey;
      mailBox.secret3 = aesDecrypted.secret;
      mailBox.nextRsa = aesDecrypted.nextRsa;
      mailBox.messages.remote.length = 0;

      this.sendMessage({ messages: mailBox.messages }, mailBox);
    } else if (mailBox._id === this.mailBoxObservable.value._id) {
      this.mailBoxObservable.next(mailBox);
    }
  }

  async reqMailBox(postData: any): Promise<any> {
    return new Promise(async (resolve, reject): Promise<any> => {
      const mailBoxRsa = await this.serviceApi.Cryptography.generateRsaKeys(
        'jwk'
      );
      postData.message = mailBoxRsa.pubkData;
      postData.secret = [...Array(20)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join('');
      const reqData = await this.serviceApi.getRequestData(
        postData,
        this.serviceApi.token
      );
      super
        .reqMailBox({
          sessionJwt: this.serviceApi.token.value.sessionJwt,
          rsaEncryptedAes: await this.serviceApi.Cryptography.ab2str(
            reqData.rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: await this.serviceApi.Cryptography.ab2str(
            reqData.aesEncrypted.ciphertext
          ),
        })
        .then(async (data: any): Promise<any> => {
          if (!data) {
            return reject();
          }
          const decryptedData: any = await this.serviceApi.decryptServerData(
            data,
            reqData.nextRsa
          );
          decryptedData.decryptedToken.data.name = postData.name;
          decryptedData.decryptedToken.data.remote = false;
          decryptedData.decryptedToken.data.privkData = mailBoxRsa.privkData;
          decryptedData.decryptedToken.data.pubkData = mailBoxRsa.pubkData;
          this.zone.run(() => {
            this.mailBoxes.next([
              ...this.mailBoxes.value,
              decryptedData.decryptedToken.data,
            ]);
            resolve(null);
          });
        });
    });
  }

  async sendMessage(postData: any, mailBox: any): Promise<any> {
    return new Promise(async (resolve, reject): Promise<any> => {
      postData.secret1 = mailBox._id;
      postData.secret2 = mailBox.secret;
      postData.secret3 = mailBox.secret3;
      if (postData.message) {
        postData.message = {
          content: postData.message,
          remote: mailBox.remote,
          timeStamp: new Date().getTime(),
        };
      }
      const reqData = await this.serviceApi.getRequestData(
        postData,
        this.serviceApi.token
      );
      super
        .setMailBox({
          sessionJwt: this.serviceApi.token.value.sessionJwt,
          rsaEncryptedAes: await this.serviceApi.Cryptography.ab2str(
            reqData.rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: await this.serviceApi.Cryptography.ab2str(
            reqData.aesEncrypted.ciphertext
          ),
        })
        .then(async (data: any): Promise<any> => {
          if (!data) {
            return reject();
          }
          const decryptedData: any = await this.serviceApi.decryptServerData(
            data,
            reqData.nextRsa
          );
          const mailBoxIndex = this.mailBoxes.value.findIndex((currentMailBox: any): any => {
            return currentMailBox._id === decryptedData.decryptedToken.data._id;
          });
          this.zone.run(() => {
            this.mailBoxes.next([
              ...this.mailBoxes.value.map((currentMailBox: any): any => {
                if (currentMailBox._id === decryptedData.decryptedToken.data._id) {
                  currentMailBox.messages = decryptedData.decryptedToken.data.messages;
                }
                return currentMailBox;
              }),
            ]);
            if (
              this.mailBoxes.value[mailBoxIndex]._id ===
              this.mailBoxObservable.value._id
            ) {
              this.mailBoxObservable.next(this.mailBoxes.value[mailBoxIndex]);
            }
            resolve(null);
          });
        });
    });
  }
  async accMailBox(postData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let reqData = await this.serviceApi.getRequestData(
        postData,
        this.serviceApi.token
      );
      super
        .getMailBox({
          save: true,
          sessionJwt: this.serviceApi.token.value.sessionJwt,
          rsaEncryptedAes: await this.serviceApi.Cryptography.ab2str(
            reqData.rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: await this.serviceApi.Cryptography.ab2str(
            reqData.aesEncrypted.ciphertext
          ),
        })
        .then(async (data: any) => {
          if (!data) {
            return reject();
          }
          let decryptedData: any = await this.serviceApi
            .decryptServerData(data, reqData.nextRsa)
            .catch(() => {
              this.serviceApi.serviceModals.hideLoading();
              this.serviceApi.serviceModals.showToast({
                status: 'error',
                statusMessage: this.serviceApi.translate.instant(
                  'components.toastr.error'
                ),
                title: this.serviceApi.translate.instant(
                  'pages.mailBox.badMailBox'
                ),
              });
              return reject();
            });
          decryptedData.decryptedToken.data.name = postData.name;
          const remoteRsaPubkData =
            decryptedData.decryptedToken.data.messages.local[0];
          const secret3 = [...Array(512)]
            .map((i) => (~~(Math.random() * 36)).toString(36))
            .join('');
          const remoteRsa = await this.serviceApi.Cryptography.generateRsaKeys(
            'jwk'
          );
          const rsaEncryptedAes = await this.serviceApi.Cryptography.getRsaEncryptedAesKey(
            remoteRsaPubkData
          );
          const aesEncrypted = await this.serviceApi.Cryptography.aesEncrypt(
            JSON.stringify({
              secret: secret3,
              nextRsa: remoteRsa.pubkData,
            }),
            rsaEncryptedAes.aesKey,
            remoteRsaPubkData
          );
          postData.messages = decryptedData.decryptedToken.data.messages;
          postData.messages.local = [];
          postData.messages.remote = [
            await this.serviceApi.Cryptography.ab2str(
              rsaEncryptedAes.encryptedAes
            ),
            await this.serviceApi.Cryptography.ab2str(aesEncrypted.ciphertext),
          ];
          reqData = await this.serviceApi.getRequestData(
            postData,
            this.serviceApi.token
          );
          super
            .setMailBox({
              sessionJwt: this.serviceApi.token.value.sessionJwt,
              rsaEncryptedAes: await this.serviceApi.Cryptography.ab2str(
                reqData.rsaEncryptedAes.encryptedAes
              ),
              aesEncrypted: await this.serviceApi.Cryptography.ab2str(
                reqData.aesEncrypted.ciphertext
              ),
            })
            .then(async (response: any) => {
              if (!response) {
                return reject();
              }
              decryptedData = await this.serviceApi.decryptServerData(
                response,
                reqData.nextRsa
              );
              decryptedData.decryptedToken.data.name = postData.name;
              decryptedData.decryptedToken.data.secret3 = secret3;
              decryptedData.decryptedToken.data.remote = true;
              decryptedData.decryptedToken.data.privkData = remoteRsa.privkData;
              decryptedData.decryptedToken.data.pubkData = remoteRsa.pubkData;
              decryptedData.decryptedToken.data.nextRsa = remoteRsaPubkData;
              decryptedData.decryptedToken.data.aesPubkData =
                rsaEncryptedAes.aesPubkData;
              this.zone.run(() => {
                this.mailBoxes.next([
                  ...this.mailBoxes.value,
                  decryptedData.decryptedToken.data,
                ]);
                resolve(null);
              });
            });
        });
    });
  }
}