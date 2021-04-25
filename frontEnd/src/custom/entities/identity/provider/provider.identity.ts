import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceIdentity } from '../service/service.identity';
import { ServiceSocket } from '@custom/services/utils/service.socket';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderIdentity extends ServiceIdentity {
  public recycleBin = new Subject<any>();
  public state = {
    language: 'en',
  };
  private socketSubscriber: any;

  crypto = {
    lock: [],
    dataLock: [],
    password: '',
    output: '',
  };

  constructor(
    http: HttpClient,
    public serviceSocket: ServiceSocket,
  ) {
    super(http);

    if (!localStorage.getItem('crypto')) {
      Object.assign(
        this.crypto,
        this.serviceSocket.serviceApi.Cryptography.makeCipherPieces(1000)
      );
    } else {
      Object.assign(this.crypto, JSON.parse(`${localStorage.getItem('crypto')}`));
    }

    this.recycleBin.subscribe(async (val) => {
      if (!this.serviceSocket.connected.value) {
        this.socketSubscriber = await this.serviceSocket.connected.subscribe(
          async (connected: any): Promise<any> => {
            if (connected) {
              await this._encryptData(val);
              this.socketSubscriber.unsubscribe();
            }
          }
        );
      } else {
        await this._encryptData(val);
      }
    });
  }

  async _encryptData(val: any): Promise<any> {
    this.serviceSocket.serviceApi.serviceModals.showLoading({
      title: this.serviceSocket.serviceApi.translate.instant(
        'components.swal.loading'
      ),
      html: this.serviceSocket.serviceApi.translate.instant(
        'services.auth-identity.encrypting'
      ),
    });
    // must encrypt val first
    this.crypto.password = [...Array(1000)]
      .map((i) => (~~(Math.random() * 2 ** 36)).toString(36))
      .join('');
    this.crypto.output = this.serviceSocket.serviceApi.Cryptography.engraveData(
      this.crypto.lock,
      this.crypto.dataLock,
      this.crypto.password,
      JSON.stringify(val)
    );
    await this.encryptData(this.crypto.password).then(() => {
      localStorage.setItem(
        'crypto',
        JSON.stringify({
          lock: this.crypto.lock,
          dataLock: this.crypto.dataLock,
          output: this.crypto.output,
        })
      );
      this.serviceSocket.serviceApi.serviceModals.hideLoading();
    });
  }

  async encryptData(postData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      postData = await this.serviceSocket.serviceApi.getRequestData(
        postData,
        this.serviceSocket.serviceApi.token
      );
      super
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
          const decryptedData: any = await this.serviceSocket.serviceApi.decryptServerData(
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

  async updateAccount(postData: any): Promise<any> {
    return new Promise(async (resolve, reject): Promise<any> => {
      postData = await this.serviceSocket.serviceApi.getRequestData(
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
        .then(async (data: any): Promise<any> => {
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

  async login(postData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const pubkData = JSON.parse(`${localStorage.getItem('sessionToken')}`).nextRsa;
      const nextRsa = await this.serviceSocket.serviceApi.Cryptography.generateRsaKeys(
        'jwk'
      );
      postData.email = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.email
      );
      postData.password = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.password
      );
      postData.pin = await this.serviceSocket.serviceApi.Cryptography.getShaHash(
        postData.pin
      );
      const rsaEncryptedAes = await this.serviceSocket.serviceApi.Cryptography.getRsaEncryptedAesKey(
        pubkData
      );
      const aesEncrypted = await this.serviceSocket.serviceApi.Cryptography.aesEncrypt(
        JSON.stringify({
          nextRsa: nextRsa.pubkData,
          ...postData,
        }),
        rsaEncryptedAes.aesKey,
        JSON.parse(`${localStorage.getItem('sessionToken')}`).nextRsa
      );
      super
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
          if (!data.valid) {
            localStorage.setItem('encryptedState', decryptedData.encryptedData);
            localStorage.setItem(
              'sessionToken',
              JSON.stringify(decryptedData.resumeToken)
            );
            this.serviceSocket.serviceApi.sessionToken.next(
              decryptedData.resumeToken
            );
            this.serviceSocket.serviceApi.token.next(
              this.serviceSocket.serviceApi.jwtHelper.decodeToken(
                decryptedData.token
              )
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
            const unlockedData: any = JSON.parse(
              this.serviceSocket.serviceApi.Cryptography.degraveData(
                this.crypto.lock,
                this.crypto.dataLock,
                this.crypto.output,
                decryptedData.data.unlockedData
              )
            );
            localStorage.setItem('crypto', JSON.stringify(this.crypto));
            Object.assign(this.state, unlockedData);
            resolve(null);
          }
        });
    });
  }
}
