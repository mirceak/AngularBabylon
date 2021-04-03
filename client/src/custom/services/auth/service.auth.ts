import { Injectable } from '@angular/core';
import { ModelUser } from '@custom/entities/user/model/model.user';
import { ServiceUser } from '@custom/entities/user/service/service.user';
import { ServiceApi } from '../utils/service.api';
import { ServiceSocket } from '../../services/utils/service.socket';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  public loggedIn = false;
  currentUser: ModelUser = null;
  constructor(
    private ServiceUser: ServiceUser,
    private serviceApi: ServiceApi,
    private serviceSocket: ServiceSocket
  ) {
    if (serviceApi.token) {
      this.setCurrentUser(this.serviceApi.token);
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
      this.ServiceUser.requestLogin({
        email: postData.email,
        rsaPubkData: firstRsaKeys.pubkData,
      }).subscribe(async (response: any) => {
        postData = Object.assign(postData, response, {
          firstRsaKeys: firstRsaKeys,
        });
        postData.nextRsa = await this.serviceApi.Cryptography.generateRsaKeys(
          'jwk'
        );
        this.ServiceUser.login(
          await this.serviceApi.Cryptography.signLoginSessionData(postData)
        ).subscribe(async (data: any) => {
          var decrypted = await this.serviceApi.decryptServerData(
            data,
            postData.nextRsa,
            false
          );
          localStorage.setItem('token', decrypted.decryptedToken);
          this.serviceApi.token = this.serviceApi.jwtHelper.decodeToken(
            decrypted.decryptedToken
          );
          this.setCurrentUser(this.serviceApi.token);
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
    this.currentUser = null;
    this.serviceApi.loggedOut.next(null);
  }

  async register(postData): Promise<any> {
    return new Promise(async (resolve) => {
      var firstRsaKeys = await this.serviceApi.Cryptography.generateRsaKeys(
        'jwk'
      );
      this.ServiceUser.requestRegister({
        email: postData.email,
        rsaPubkData: firstRsaKeys.pubkData,
      }).subscribe(async (response: any) => {
        postData = Object.assign(postData, response, {
          firstRsaKeys: firstRsaKeys,
        });
        postData.nextRsa = await this.serviceApi.Cryptography.generateRsaKeys(
          'jwk'
        );
        this.ServiceUser.register(
          await this.serviceApi.Cryptography.signRegisterSessionData(postData)
        ).subscribe(async (data: any) => {
          var decrypted = await this.serviceApi.decryptServerData(
            data,
            postData.nextRsa,
            false
          );
          decrypted.decryptedToken = JSON.stringify(decrypted.decryptedToken);
          localStorage.setItem('token', decrypted.decryptedToken);
          this.serviceApi.token = this.serviceApi.jwtHelper.decodeToken(
            decrypted.decryptedToken
          );
          this.setCurrentUser(this.serviceApi.token);
          this.serviceApi.zone.run(() => {
            this.serviceApi.router.navigate(['/']);
            resolve(null);
          });
        });
      });
    });
  }

  setCurrentUser(decodedToken): void {
    this.currentUser = new ModelUser();
    this.loggedIn = true;
    this.serviceSocket.connectSocket();
  }
}
