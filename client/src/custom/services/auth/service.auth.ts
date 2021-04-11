import { Injectable } from '@angular/core';
import { ProviderUser } from '@custom/entities/user/provider/provider.user';
import { ServiceApi } from '../utils/service.api';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  constructor(
    private ProviderUser: ProviderUser,
    public serviceApi: ServiceApi
  ) {
    var _token = localStorage.getItem('token');
    if (_token) {
      this.serviceApi.loggedIn.next(true);
      this.serviceApi.token.next(this.serviceApi.jwtHelper.decodeToken(_token));
    }
    this.serviceApi.token.subscribe((token) => {
      if (token == null) {
        this.logout(false);
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
      }).subscribe(async (response: any) => {
        postData = Object.assign(postData, response, {
          firstRsaKeys: firstRsaKeys,
        });
        postData.nextRsa = await this.serviceApi.Cryptography.generateRsaKeys(
          'jwk'
        );
        let request;
        try {
          request = await this.signLoginSessionData(postData);
        } catch (e) {
          return reject(null);
        }
        this.ProviderUser.login(request).subscribe(async (data: any) => {
          var decrypted = await this.serviceApi.decryptServerData(
            data,
            postData.nextRsa,
            false
          );
          this.serviceApi.loggedIn.next(true);
          localStorage.setItem('token', decrypted.decryptedToken);
          this.serviceApi.token.next(
            this.serviceApi.jwtHelper.decodeToken(decrypted.decryptedToken)
          );
          localStorage.setItem(
            'access_token',
            JSON.stringify(this.serviceApi.token.value.sessionJwt)
          );
          this.serviceApi.zone.run(() => {
            this.serviceApi.router.navigate(['/']);
            resolve(null);
          });
        });
      });
    });
  }

  logout(resetToken = true): void {
    localStorage.clear();
    this.serviceApi.loggedIn.next(false);
    if (resetToken) {
      this.serviceApi.loggedOut.next(null);
    }
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
      }).subscribe(async (response: any) => {
        postData = Object.assign(postData, response, {
          firstRsaKeys: firstRsaKeys,
        });
        postData.nextRsa = await this.serviceApi.Cryptography.generateRsaKeys(
          'jwk'
        );
        let request;
        try {
          request = await this.signRegisterSessionData(postData);
        } catch (e) {
          return reject(null);
        }
        this.ProviderUser.register(request).subscribe(async (data: any) => {
          var decrypted = await this.serviceApi.decryptServerData(
            data,
            postData.nextRsa,
            false
          );
          this.serviceApi.loggedIn.next(true);
          localStorage.setItem('token', decrypted.decryptedToken);
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
