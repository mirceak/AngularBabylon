import { Injectable, NgZone } from '@angular/core';
import _Cryptography from '../../../cryptography';

import { TranslateService } from '@ngx-translate/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceModals } from './service.modals';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {
  lang = 'en';

  public loggedIn = new BehaviorSubject<any>(null);
  public loggedOut = new Subject();
  public token = new BehaviorSubject<any>(null);
  public Cryptography: _Cryptography = new _Cryptography(window.crypto);

  constructor(
    public translate: TranslateService,
    public jwtHelper: JwtHelperService,
    public serviceModals: ServiceModals,
    public router: Router,
    public zone: NgZone
  ) {
    this.loggedOut.subscribe(this.logout.bind(this));
  }

  logout() {
    this.token.next(null);
    this.router.navigate(['/auth/login']);
  }

  async getRequestData(postData, token) {
    var nextRsa = await this.Cryptography.generateRsaKeys('jwk');
    var rsaEncryptedAes = await this.Cryptography.getRsaEncryptedAesKey(
      token.value.nextRsa
    );
    var aesEncrypted = await this.Cryptography.aesEncrypt(
      JSON.stringify({ data: postData, nextRsa: nextRsa.pubkData }),
      rsaEncryptedAes.aesKey,
      token.value.nextRsa
    );
    return {
      nextRsa,
      rsaEncryptedAes,
      aesEncrypted,
    };
  }

  async decryptServerData(data, nextRsa, parse = true) {
    data.rsaEncryptedAes = this.Cryptography.str2ab(data.rsaEncryptedAes);
    data.aesEncrypted = this.Cryptography.str2ab(data.aesEncrypted);
    var decryptedAes = await this.Cryptography.rsaDecrypt(
      data.rsaEncryptedAes,
      nextRsa.privateKey
    );
    var aesKey = await this.Cryptography.importAesKey(decryptedAes);
    var decryptedToken: any = await this.Cryptography.aesDecrypt(
      data.aesEncrypted,
      aesKey,
      nextRsa.pubkData
    );
    if (parse) decryptedToken = JSON.parse(decryptedToken);
    return {
      decryptedToken: decryptedToken,
      decryptedAes: decryptedAes,
      aesKey: aesKey,
    };
  }
}
