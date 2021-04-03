import { Injectable } from '@angular/core';
import { ProviderUser } from '@custom/entities/user/provider/provider.user';
import { ServiceApi } from '../utils/service.api';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  public loggedIn = false;
  constructor(
    private ProviderUser: ProviderUser,
    private serviceApi: ServiceApi
  ) {
    var _token = localStorage.getItem('token');
    if (_token) {
      this.loggedIn = true;
      this.serviceApi.token.next(
        this.serviceApi.jwtHelper.decodeToken(_token)
      );
    }
  }

  async login(postData): Promise<any> {
    return new Promise(async (resolve) => {
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
        this.ProviderUser.login(
          await this.serviceApi.Cryptography.signLoginSessionData(postData)
        ).subscribe(async (data: any) => {
          var decrypted = await this.serviceApi.decryptServerData(
            data,
            postData.nextRsa,
            false
          );
          this.loggedIn = true;
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

  logout(): void {
    localStorage.clear();
    this.loggedIn = false;
    this.serviceApi.loggedOut.next(null);
  }

  async register(postData): Promise<any> {
    return new Promise(async (resolve) => {
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
        this.ProviderUser.register(
          await this.serviceApi.Cryptography.signRegisterSessionData(postData)
        ).subscribe(async (data: any) => {
          var decrypted = await this.serviceApi.decryptServerData(
            data,
            postData.nextRsa,
            false
          );
          this.loggedIn = true;
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
}
