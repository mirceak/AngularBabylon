import { Injectable } from '@angular/core';
import { ProviderUser } from '@custom/entities/user/provider/provider.user';
import { ProviderIdentity } from '@custom/entities/identity/provider/provider.identity';
import { ServiceApi } from '../utils/service.api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  constructor(
    public providerUser: ProviderUser,
    public providerIdentity: ProviderIdentity,
    private router: Router,
    public serviceApi: ServiceApi
  ) {
  }

  async login(postData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      postData.email = await this.serviceApi.Cryptography.getShaHash(
        postData.email
      );
      postData.password = await this.serviceApi.Cryptography.getShaHash(
        postData.password
      );
      postData.pin = await this.serviceApi.Cryptography.getShaHash(
        postData.pin
      );
      const firstRsaKeys = await this.serviceApi.Cryptography.generateRsaKeys(
        'jwk'
      );
      this.providerUser
        .requestLogin({
          email: postData.email,
          rsaPubkData: firstRsaKeys.pubkData,
        })
        .then(async (response: any) => {
          postData = Object.assign(postData, response, {
            firstRsaKeys,
          });
          postData.nextRsa = await this.serviceApi.Cryptography.generateRsaKeys(
            'jwk'
          );
          let request: any;
          try {
            request = await this.signLoginSessionData(postData);
          } catch (error) {
            return reject(null);
          }
          this.providerUser.login(request).then(async (data: any) => {
            const decrypted: any = await this.serviceApi.decryptServerData(
              data,
              postData.nextRsa
            );
            localStorage.setItem(
              'sessionToken',
              decrypted.decryptedToken.sessionToken
            );
            this.serviceApi.sessionToken.next(
              JSON.parse(decrypted.decryptedToken.sessionToken)
            );
            this.serviceApi.socketToken.next(
              JSON.parse(decrypted.decryptedToken.socketToken)
            );
            this.serviceApi.crypto.password = request.statePassword;
            this.serviceApi.encryptAndSaveState(request.statePassword);
            this.serviceApi.loggedIn.next(true);
            this.serviceApi.zone.run(() => {
              this.serviceApi.router.navigate(['/']);
              resolve(null);
            });
          });
        });
    });
  }

  logout(): void {
    localStorage.clear();
    this.serviceApi.logout();
    this.router.navigate(['/auth/login']);
  }

  async register(postData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      postData.email = await this.serviceApi.Cryptography.getShaHash(
        postData.email
      );
      postData.password = await this.serviceApi.Cryptography.getShaHash(
        postData.password
      );
      postData.pin = await this.serviceApi.Cryptography.getShaHash(
        postData.pin
      );
      const firstRsaKeys = await this.serviceApi.Cryptography.generateRsaKeys(
        'jwk'
      );
      this.providerUser
        .requestRegister({
          email: postData.email,
          rsaPubkData: firstRsaKeys.pubkData,
        })
        .then(async (response: any) => {
          postData = Object.assign(postData, response, {
            firstRsaKeys,
          });
          postData.nextRsa = await this.serviceApi.Cryptography.generateRsaKeys(
            'jwk'
          );
          let request: any;
          try {
            request = await this.signRegisterSessionData(postData);
          } catch (error) {
            return reject(null);
          }
          this.providerUser.register(request).then(async (data: any) => {
            const decrypted: any = await this.serviceApi.decryptServerData(
              data,
              postData.nextRsa
            );
            localStorage.setItem(
              'sessionToken',
              decrypted.decryptedToken.sessionToken
            );
            this.serviceApi.sessionToken.next(
              JSON.parse(decrypted.decryptedToken.sessionToken)
            );
            this.serviceApi.socketToken.next(
              JSON.parse(decrypted.decryptedToken.socketToken)
            );
            this.serviceApi.crypto.password = request.statePassword;
            this.serviceApi.encryptAndSaveState(request.statePassword);
            this.serviceApi.loggedIn.next(true);
            this.serviceApi.zone.run(() => {
              this.serviceApi.router.navigate(['/']);
              resolve(null);
            });
          });
        });
    });
  }

  public async signLoginSessionData(postData: any): Promise<any> {
    const options = {
      rsaEncryptedAesKey: this.serviceApi.Cryptography.str2ab(
        postData.rsaEncryptedAesKey
      ),
      aesEncrypted: this.serviceApi.Cryptography.str2ab(postData.aesEncrypted),
      passHash: '',
      password: postData.password,
    };
    const nextRsa = postData.nextRsa;
    let rsaDecryptedAesKey = null;
    let aesKey = null;
    let userHash = null;
    let fullHash = null;
    let totalHash = null;
    let decryptedAes = null;
    let rsaEncryptedAesKey = null;
    let finalHash = null;
    let rsaEncryptedAesKeyHash = null;
    let cipherMap = null;
    let aesEncrypted = null;

    options.passHash = await this.serviceApi.Cryptography.getShaHash(
      postData.password
    );
    rsaDecryptedAesKey = await this.serviceApi.Cryptography.rsaDecrypt(
      options.rsaEncryptedAesKey,
      postData.firstRsaKeys.privateKey
    );
    aesKey = await this.serviceApi.Cryptography.importAesKey(
      rsaDecryptedAesKey
    );
    userHash = await this.serviceApi.Cryptography.getShaHash(
      postData.firstRsaKeys.pubkData + rsaDecryptedAesKey
    );
    fullHash = await this.serviceApi.Cryptography.getShaHash(
      (await this.serviceApi.Cryptography.getShaHash(options.passHash)) +
        postData.firstRsaKeys.pubkData +
        rsaDecryptedAesKey
    );
    totalHash = await this.serviceApi.Cryptography.getShaHash(
      fullHash + userHash
    );
    decryptedAes = JSON.parse(
      await this.serviceApi.Cryptography.aesDecrypt(
        options.aesEncrypted,
        aesKey,
        totalHash
      )
    );
    rsaEncryptedAesKey = await this.serviceApi.Cryptography.getRsaEncryptedAesKey(
      decryptedAes.secondRsaPubkData
    );
    finalHash = await this.serviceApi.Cryptography.getShaHash(
      totalHash +
        fullHash +
        userHash +
        decryptedAes.secondRsaPubkData +
        this.serviceApi.Cryptography.ab2str(rsaEncryptedAesKey.encryptedAes)
    );
    rsaEncryptedAesKeyHash = await this.serviceApi.Cryptography.getShaHash(
      this.serviceApi.Cryptography.ab2str(rsaEncryptedAesKey.encryptedAes)
    );
    const statePassword = [...Array(20)]
      .map((i) => (~~(Math.random() * 2 ** 36)).toString(36))
      .join('');
    const output = this.serviceApi.Cryptography.engraveData(
      this.serviceApi.crypto.lock,
      this.serviceApi.crypto.dataLock,
      this.serviceApi.crypto.basePassword,
      statePassword
    );
    cipherMap = await this.serviceApi.Cryptography.makeCipherMap(
      [finalHash, userHash, fullHash, totalHash, rsaEncryptedAesKeyHash],
      JSON.stringify({
        password: options.password,
        pin: postData.pin,
        nextRsa: nextRsa.pubkData,
        statePassword: output,
      })
    );
    aesEncrypted = await this.serviceApi.Cryptography.aesEncrypt(
      JSON.stringify({
        cipherLock: cipherMap.lock,
        cipherDataLock: cipherMap.dataLock,
        cipherOutput: cipherMap.output,
      }),
      rsaEncryptedAesKey.aesKey,
      finalHash
    );
    return {
      statePassword,
      sessionJwt: decryptedAes.sessionJwt,
      aesEncrypted: this.serviceApi.Cryptography.ab2str(
        aesEncrypted.ciphertext
      ),
      rsaEncryptedAesKey: this.serviceApi.Cryptography.ab2str(
        rsaEncryptedAesKey.encryptedAes
      ),
    };
  }

  public async signRegisterSessionData(postData: any): Promise<any> {
    const options = {
      rsaEncryptedAesKey: this.serviceApi.Cryptography.str2ab(
        postData.rsaEncryptedAesKey
      ),
      aesEncrypted: this.serviceApi.Cryptography.str2ab(postData.aesEncrypted),
      referralEmail: postData.referralEmail,
      referralCode: postData.referralCode,
      password: postData.password,
      email: postData.email,
    };
    const nextRsa = postData.nextRsa;
    let aesKey = null;
    let userHash = null;
    let fullHash = null;
    let totalHash = null;
    let decryptedAes = null;
    let rsaEncryptedAesKey = null;
    let finalHash = null;
    let rsaEncryptedAesKeyHash = null;
    let cipherMap = null;
    let aesEncrypted = null;
    const rsaDecryptedAesKey = await this.serviceApi.Cryptography.rsaDecrypt(
      options.rsaEncryptedAesKey,
      postData.firstRsaKeys.privateKey
    );
    aesKey = await this.serviceApi.Cryptography.importAesKey(
      rsaDecryptedAesKey
    );
    userHash = await this.serviceApi.Cryptography.getShaHash(
      postData.firstRsaKeys.pubkData + rsaDecryptedAesKey
    );
    fullHash = await this.serviceApi.Cryptography.getShaHash(
      (await this.serviceApi.Cryptography.getShaHash(options.referralEmail)) +
        (await this.serviceApi.Cryptography.getShaHash(options.referralCode)) +
        postData.firstRsaKeys.pubkData +
        rsaDecryptedAesKey
    );
    totalHash = await this.serviceApi.Cryptography.getShaHash(
      fullHash + userHash
    );
    decryptedAes = JSON.parse(
      await this.serviceApi.Cryptography.aesDecrypt(
        options.aesEncrypted,
        aesKey,
        totalHash
      )
    );
    rsaEncryptedAesKey = await this.serviceApi.Cryptography.getRsaEncryptedAesKey(
      decryptedAes.secondRsaPubkData
    );
    finalHash = await this.serviceApi.Cryptography.getShaHash(
      totalHash +
        fullHash +
        userHash +
        decryptedAes.secondRsaPubkData +
        this.serviceApi.Cryptography.ab2str(rsaEncryptedAesKey.encryptedAes)
    );
    rsaEncryptedAesKeyHash = await this.serviceApi.Cryptography.getShaHash(
      this.serviceApi.Cryptography.ab2str(rsaEncryptedAesKey.encryptedAes)
    );
    const statePassword = [...Array(20)]
      .map((i) => (~~(Math.random() * 2 ** 36)).toString(36))
      .join('');
    const output = this.serviceApi.Cryptography.engraveData(
      this.serviceApi.crypto.lock,
      this.serviceApi.crypto.dataLock,
      this.serviceApi.crypto.basePassword,
      statePassword
    );
    cipherMap = await this.serviceApi.Cryptography.makeCipherMap(
      [finalHash, userHash, fullHash, totalHash, rsaEncryptedAesKeyHash],
      JSON.stringify({
        password: options.password,
        pin: postData.pin,
        nextRsa: nextRsa.pubkData,
        statePassword: output,
      })
    );
    aesEncrypted = await this.serviceApi.Cryptography.aesEncrypt(
      JSON.stringify({
        cipherLock: cipherMap.lock,
        cipherDataLock: cipherMap.dataLock,
        cipherOutput: cipherMap.output,
      }),
      rsaEncryptedAesKey.aesKey,
      finalHash
    );
    return {
      statePassword,
      sessionJwt: decryptedAes.sessionJwt,
      aesEncrypted: this.serviceApi.Cryptography.ab2str(
        aesEncrypted.ciphertext
      ),
      rsaEncryptedAesKey: this.serviceApi.Cryptography.ab2str(
        rsaEncryptedAesKey.encryptedAes
      ),
    };
  }
}
