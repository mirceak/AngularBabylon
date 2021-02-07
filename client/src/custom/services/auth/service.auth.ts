import { Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelUser } from '@custom/entities/user/model/model.user';
import { ServiceCryptography } from '@custom/services/tunnel/service.cryptography';
import _Cryptography from '../../../cryptography';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  private Cryptography: _Cryptography = new _Cryptography(window.crypto);
  loggedIn = false;
  roles: any = {
    guest: true,
  };
  currentUser: ModelUser = null;
  constructor(
    private ServiceCryptography: ServiceCryptography,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private zone: NgZone
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.setCurrentUser(decodedToken);
      return;
    }
  }

  async login(postData): Promise<any> {
    var rsaKeys_0 = await this.Cryptography.generateRsaKeys('jwk');
    this.ServiceCryptography
      .requestLogin({
        email: postData.email,
        rsaPubkData: rsaKeys_0.pubkData,
      })
      .subscribe(async (response: any) => {
        postData = Object.assign(postData, response, { rsaKeys_0: rsaKeys_0 });
        this.ServiceCryptography
          .login(await this.Cryptography.signLoginSessionData(postData))
          .subscribe(async (data: any) => {
            localStorage.setItem('token', data.token);
            this.setCurrentUser(this.jwtHelper.decodeToken(data.token));
            this.zone.run(() => {
              this.router.navigate(['/']);
            });
          });
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  reqSignup(): void {

  }

  setCurrentUser(decodedToken): void {
    this.currentUser = new ModelUser();
    this.loggedIn = true;
    this.currentUser.email = decodedToken.user.email;
  }
}
