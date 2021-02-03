import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelUser } from '@custom/entities/user/model/model.user';
import cipher from '../../../cipher';
import { ServiceTunnel } from '@custom/services/tunnel/service.tunnel';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  private p1;
  private p2;
  private p3;
  private ph2;
  private ph3;
  private subtle;

  loggedIn = false;
  roles: any = {
    guest: true,
  };

  currentUser: ModelUser = new ModelUser();

  constructor(
    private serviceTunnel: ServiceTunnel,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService
  ) {
    this.subtle = window.crypto.subtle;
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
    this.login({
      email: 'mircea.bereveanu@gmail.com',
      username: 'mircea',
      password: 'qweqwe',
    });
  }

  str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  
  async login(postData): Promise<any> {
    var rsaKeys_0 = await cipher.generateRsaKeys(this.subtle, 'jwk');
    var rsaKeys_1 = await cipher.generateRsaKeys(this.subtle, 'jwk');
    this.p2 = postData.username;
    this.p3 = postData.password;
    this.p1 = postData.email;
    this.ph2 = await cipher.getShaHash(this.subtle, this.p2);
    this.ph3 = await cipher.getShaHash(this.subtle, this.p3);
    this.cookieService.set('', '');
    (
      await this.serviceTunnel.requestLogin({
        email: this.p1,
        rsaPubkData: rsaKeys_0.pubkData,
      })
    ).subscribe(async (response: any) => {
      response = {
        jwt: response.jwt,
        rsaEncryptedAesKey: this.str2ab(response.rsaEncryptedAesKey),
        aesEncrypted: this.str2ab(response.aesEncrypted),
      };
      var rsaDecryptedAesKey = await cipher.rsaDecrypt(
        this.subtle,
        response.rsaEncryptedAesKey,
        rsaKeys_0.privateKey
      );
      var aesKey = await cipher.importAesKey(this.subtle, rsaDecryptedAesKey);
      var userHash = await cipher.getShaHash(
        this.subtle,
        JSON.stringify({
          initialRsaPubkData: rsaKeys_0.pubkData,
          initialAesPubkData: rsaDecryptedAesKey,
        })
      );
      var fullHash = await cipher.getShaHash(
        this.subtle,
        await cipher.getShaHash(
          this.subtle,
          JSON.stringify({
            username: this.ph2,
            password: this.ph3,
            initialRsaPubkData: rsaKeys_0.pubkData,
            initialAesPubkData: rsaDecryptedAesKey,
          }).substr(0, 6)
        )
      );
      var totalHash = await cipher.getShaHash(
        this.subtle,
        await cipher.getShaHash(
          this.subtle,
          JSON.stringify({
            userHash: userHash,
            fullHash: fullHash,
          })
        )
      );
      var decryptedAes = JSON.parse(
        await cipher.aesDecrypt(
          this.subtle,
          response.aesEncrypted,
          aesKey,
          totalHash
        )
      );
      var rsaEncryptedAesKey = await cipher.getRsaEncryptedAesKey(
        this.subtle,
        decryptedAes.rsaPubkData
      );
      var finalHash = await cipher.getShaHash(
        this.subtle,
        JSON.stringify({
          totalHash: totalHash,
          fullHash: fullHash,
          userHash: userHash,
          rsaPubkData: rsaKeys_1.pubkData,
          rsaEncryptedAesKey: new TextDecoder().decode(
            rsaEncryptedAesKey.rsaEncryptedAes
          ),
        })
      );
      var rsaEncryptedAesKeyHash = await cipher.getShaHash(
        this.subtle,
        new TextDecoder().decode(rsaEncryptedAesKey.rsaEncryptedAes)
      );
      var _cipher = await cipher.makeCipher(
        [userHash, fullHash, rsaEncryptedAesKeyHash, finalHash],
        JSON.stringify({ username: this.p2, password: this.p3 })
      );
      var aesEncrypted = await cipher.aesEncrypt(
        this.subtle,
        JSON.stringify({
          cipherLock: _cipher.lock,
          cipherDataLock: _cipher.dataLock,
        }),
        rsaEncryptedAesKey.aesKey,
        finalHash
      );
      (
        await this.serviceTunnel.login({
          jwt: response.jwt,
          aesEncrypted: String.fromCharCode.apply(
            null,
            new Uint8Array(aesEncrypted.ciphertext)
          ),
          rsaEncryptedAesKey: String.fromCharCode.apply(
            null,
            new Uint8Array(rsaEncryptedAesKey.rsaEncryptedAes)
          ),
          rsaPubkData: rsaKeys_1.pubkData,
        })
      ).subscribe(async (data: any) => {
        console.log(this.jwtHelper.decodeToken(data.token));
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.roles.admin = false;
    this.currentUser = new ModelUser();
    this.router.navigate(['/login']);
  }

  decodeUserFromToken(token): object {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser): void {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    this.roles.admin = decodedUser.role === 'admin';
    delete decodedUser.role;
  }
}
