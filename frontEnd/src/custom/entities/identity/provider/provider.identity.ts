import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceIdentity } from '../service/service.identity';
import { ServiceSocket } from '@custom/services/utils/service.socket';

@Injectable({
  providedIn: 'root',
})
export class ProviderIdentity extends ServiceIdentity {
  constructor(http: HttpClient, public serviceSocket: ServiceSocket) {
    super(http);
  }

  async updateAccount(postData: any): Promise<any> {
    return new Promise(
      async (resolve, reject): Promise<any> => {
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
        postData = await this.serviceSocket.serviceApi.getRequestData(
          postData,
          this.serviceSocket.serviceApi.token
        );
        super
          .account({
            sessionJwt: this.serviceSocket.serviceApi.token.value.sessionJwt,
            rsaEncryptedAes: await this.serviceSocket.serviceApi.Cryptography.ab2str(
              postData.rsaEncryptedAes.encryptedAes
            ),
            aesEncrypted: await this.serviceSocket.serviceApi.Cryptography.ab2str(
              postData.aesEncrypted.ciphertext
            ),
          })
          .then(
            async (data: any): Promise<any> => {
              if (!data) {
                return reject();
              }
              const decryptedData = await this.serviceSocket.serviceApi.decryptServerData(
                data,
                postData.nextRsa
              );
              localStorage.setItem(
                'sessionToken',
                decryptedData.parsedToken.data.sessionToken
              );
              this.serviceSocket.disconnectSocket();
              this.serviceSocket.serviceApi.socketToken.next(
                JSON.parse(decryptedData.parsedToken.data.socketToken)
              );
              this.serviceSocket.connectSocket();
              this.serviceSocket.serviceApi.sessionToken.next(
                JSON.parse(decryptedData.parsedToken.data.sessionToken)
              );
              this.serviceSocket.serviceApi.encryptAndSaveState(
                this.serviceSocket.serviceApi.crypto.password
              );
              resolve(null);
            }
          );
      }
    );
  }

  async login(postData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const sessionToken = JSON.parse(
        localStorage.getItem('sessionToken') || ''
      );
      const nextRsa = await this.serviceSocket.serviceApi.Cryptography.generateRsaKeys(
        'jwk'
      );
      if (postData.password) {
        postData.password = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
          postData.password
        );
      }
      postData.pin = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.pin
      );
      const rsaEncryptedAes = await this.serviceSocket.serviceApi.Cryptography.getRsaEncryptedAesKey(
        sessionToken.nextRsa
      );
      const aesEncrypted = await this.serviceSocket.serviceApi.Cryptography.aesEncrypt(
        JSON.stringify({
          nextRsa: nextRsa.pubkData,
          ...postData,
        }),
        rsaEncryptedAes.aesKey,
        sessionToken.nextRsa
      );
      super
        .login({
          sessionToken,
          rsaEncryptedAes: this.serviceSocket.serviceApi.Cryptography.ab2str(
            rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: this.serviceSocket.serviceApi.Cryptography.ab2str(
            aesEncrypted.ciphertext
          ),
        })
        .then(async (data: any) => {
          if (!data) {
            return reject();
          }
          data.rsaEncryptedAes = this.serviceSocket.serviceApi.Cryptography.str2ab(
            data.rsaEncryptedAes
          );
          data.aesEncrypted = this.serviceSocket.serviceApi.Cryptography.str2ab(
            data.aesEncrypted
          );
          const decryptedAes = await this.serviceSocket.serviceApi.Cryptography.rsaDecrypt(
            data.rsaEncryptedAes,
            nextRsa.privateKey
          );
          const aesKey = await this.serviceSocket.serviceApi.Cryptography.importAesKey(
            decryptedAes
          );
          const decryptedData: any = JSON.parse(
            await this.serviceSocket.serviceApi.Cryptography.aesDecrypt(
              data.aesEncrypted,
              aesKey,
              nextRsa.pubkData
            )
          );
          if (decryptedData.failedPin) {
            this.serviceSocket.serviceApi.serviceModals.showToast({
              status: 'error',
              statusMessage: this.serviceSocket.serviceApi.translate.instant(
                'components.toastr.error'
              ),
              title: this.serviceSocket.serviceApi.translate.instant(
                decryptedData.message || 'services.error'
              ),
            });
            localStorage.setItem('sessionToken', JSON.stringify(decryptedData));
            this.serviceSocket.serviceApi.sessionToken.next(decryptedData);
            this.serviceSocket.serviceApi.serviceModals.hideLoading();
            return reject();
          } else {
            const decryptedToken: any = this.serviceSocket.serviceApi.jwtHelper.decodeToken(
              decryptedData.token
            );
            localStorage.setItem('sessionToken', decryptedToken.sessionToken);
            this.serviceSocket.serviceApi.sessionToken.next(
              JSON.parse(decryptedToken.sessionToken)
            );
            this.serviceSocket.serviceApi.socketToken.next(
              JSON.parse(decryptedToken.socketToken)
            );
            this.serviceSocket.serviceApi.token.next(decryptedToken);
            this.serviceSocket.serviceApi.decryptStateWithEncryptedPass(
              decryptedToken.statePassword
            );
            resolve(null);
          }
        });
    });
  }
}
