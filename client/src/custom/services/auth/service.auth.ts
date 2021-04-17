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
    public ProviderUser: ProviderUser,
    public ProviderIdentity: ProviderIdentity,
    private router: Router,
    public serviceApi: ServiceApi
  ) {
    if (localStorage.getItem('encryptedState')) {
      this.serviceApi.sessionToken.next(
        JSON.parse(localStorage.getItem('sessionToken'))
      );
    }
    this.serviceApi.token.subscribe((token) => {
      if (token == null && serviceApi.loggedIn.value) {
        this.logout();
      }
    });
  }

  async login(postData): Promise<any> {
    return new Promise(async (resolve, reject) => {
      postData.email = await this.serviceApi.Cryptography.getShaHash(
        postData.email
      );
      var firstRsaKeys = await this.serviceApi.Cryptography.generateRsaKeys(
        'jwk'
      );
      this.ProviderUser.requestLogin({
        email: postData.email,
        rsaPubkData: firstRsaKeys.pubkData,
      }).then(async (response: any) => {
        postData = Object.assign(postData, response, {
          firstRsaKeys: firstRsaKeys,
        });
        postData.nextRsa = await this.serviceApi.Cryptography.generateRsaKeys(
          'jwk'
        );
        let request;
        try {
          request = await this.signLoginSessionData(postData);
        } catch (error) {
          return reject(null);
        }
        this.ProviderUser.login(request).then(async (data: any) => {
          var decrypted = await this.serviceApi.decryptServerData(
            data,
            postData.nextRsa,
            false
          );
          this.serviceApi.token.next(
            this.serviceApi.jwtHelper.decodeToken(decrypted.decryptedToken)
          );
          this.serviceApi.loggedIn.next(true);
          this.ProviderIdentity.recycleBin.next(this.ProviderIdentity.state);
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
    this.router.navigate(['/auth/login']);
    this.serviceApi.loggedIn.next(false);
  }

  async register(postData): Promise<any> {
    return new Promise(async (resolve, reject) => {
      postData.email = await this.serviceApi.Cryptography.getShaHash(
        postData.email
      );
      var firstRsaKeys = await this.serviceApi.Cryptography.generateRsaKeys(
        'jwk'
      );
      this.ProviderUser.requestRegister({
        email: postData.email,
        rsaPubkData: firstRsaKeys.pubkData,
      }).then(async (response: any) => {
        postData = Object.assign(postData, response, {
          firstRsaKeys: firstRsaKeys,
        });
        postData.nextRsa = await this.serviceApi.Cryptography.generateRsaKeys(
          'jwk'
        );
        let request;
        try {
          request = await this.signRegisterSessionData(postData);
        } catch (error) {
          return reject(null);
        }
        this.ProviderUser.register(request).then(async (data: any) => {
          var decrypted = await this.serviceApi.decryptServerData(
            data,
            postData.nextRsa,
            false
          );
          this.serviceApi.loggedIn.next(true);
          this.ProviderIdentity.recycleBin.next(this.ProviderIdentity.state);
          this.serviceApi.token.next(
            this.serviceApi.jwtHelper.decodeToken(decrypted.decryptedToken)
          );
          this.serviceApi.zone.run(() => {
            this.serviceApi.router.navigate(['/']);
            resolve(null);
          });
        });
      });
    });
  }

  public async signLoginSessionData(postData) {
    var options = {
      rsaEncryptedAesKey: this.serviceApi.Cryptography.str2ab(
        postData.rsaEncryptedAesKey
      ),
      aesEncrypted: this.serviceApi.Cryptography.str2ab(postData.aesEncrypted),
      passHash: null,
      password: postData.password,
    };
    var nextRsa = postData.nextRsa;
    var rsaDecryptedAesKey = null;
    var aesKey = null;
    var userHash = null;
    var fullHash = null;
    var totalHash = null;
    var decryptedAes = null;
    var rsaEncryptedAesKey = null;
    var finalHash = null;
    var rsaEncryptedAesKeyHash = null;
    var cipherMap = null;
    var aesEncrypted = null;

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
    cipherMap = await this.serviceApi.Cryptography.makeCipherMap(
      [finalHash, userHash, fullHash, totalHash, rsaEncryptedAesKeyHash],
      JSON.stringify({
        password: options.password,
        pin: postData.pin,
        nextRsa: nextRsa.pubkData,
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
      sessionJwt: decryptedAes.sessionJwt,
      aesEncrypted: this.serviceApi.Cryptography.ab2str(
        aesEncrypted.ciphertext
      ),
      rsaEncryptedAesKey: this.serviceApi.Cryptography.ab2str(
        rsaEncryptedAesKey.encryptedAes
      ),
    };
  }

  public async signRegisterSessionData(postData) {
    var options = {
      rsaEncryptedAesKey: this.serviceApi.Cryptography.str2ab(
        postData.rsaEncryptedAesKey
      ),
      aesEncrypted: this.serviceApi.Cryptography.str2ab(postData.aesEncrypted),
      referralEmail: postData.referralEmail,
      referralCode: postData.referralCode,
      password: postData.password,
      email: postData.email,
    };
    var nextRsa = postData.nextRsa;
    var aesKey = null;
    var userHash = null;
    var fullHash = null;
    var totalHash = null;
    var decryptedAes = null;
    var rsaEncryptedAesKey = null;
    var finalHash = null;
    var rsaEncryptedAesKeyHash = null;
    var cipherMap = null;
    var aesEncrypted = null;
    var rsaDecryptedAesKey = await this.serviceApi.Cryptography.rsaDecrypt(
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
    cipherMap = await this.serviceApi.Cryptography.makeCipherMap(
      [finalHash, userHash, fullHash, totalHash, rsaEncryptedAesKeyHash],
      JSON.stringify({
        password: options.password,
        pin: postData.pin,
        nextRsa: nextRsa.pubkData,
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
