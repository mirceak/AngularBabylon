import { Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelUser } from '@custom/entities/user/model/model.user';
import { ServiceCryptography } from '@custom/services/cryptography/service.cryptography';
import _Cryptography from '../../../cryptography';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  private Cryptography: _Cryptography = new _Cryptography(window.crypto);
  private token: any;
  public referrals: any;
  loggedIn = false;
  currentUser: ModelUser = null;
  constructor(
    private ServiceCryptography: ServiceCryptography,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private zone: NgZone
  ) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.token = this.jwtHelper.decodeToken(this.token);
      this.setCurrentUser(this.token);
      this.referrals = this.token.user.referrals;
      return;
    }
  }

  async login(postData): Promise<any> {
    var rsaKeys_0 = await this.Cryptography.generateRsaKeys('jwk');
    this.ServiceCryptography.requestLogin({
      email: postData.email,
      rsaPubkData: rsaKeys_0.pubkData,
    }).subscribe(async (response: any) => {
      postData = Object.assign(postData, response, { rsaKeys_0: rsaKeys_0 });
      this.ServiceCryptography.login(
        await this.Cryptography.signLoginSessionData(postData)
      ).subscribe(async (data: any) => {
        localStorage.setItem('token', data.token);
        this.token = this.jwtHelper.decodeToken(data.token);
        this.referrals = this.token.user.referrals;
        this.setCurrentUser(this.token);
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

  async register(postData): Promise<any> {
    var rsaKeys_0 = await this.Cryptography.generateRsaKeys('jwk');
    this.ServiceCryptography.requestRegister({
      email: postData.email,
      referralEmail: postData.referralEmail,
      rsaPubkData: rsaKeys_0.pubkData,
    }).subscribe(async (response: any) => {
      postData = Object.assign(postData, response, { rsaKeys_0: rsaKeys_0 });
      this.ServiceCryptography.register(
        await this.Cryptography.signRegisterSessionData(postData)
      ).subscribe(async (data: any) => {
        localStorage.setItem('token', data.token);
        this.token = this.jwtHelper.decodeToken(data.token);
        this.referrals = this.token.user.referrals;
        this.setCurrentUser(this.token);
        this.zone.run(() => {
          this.router.navigate(['/']);
        });
      });
    });
  }

  async reqSignup(postData): Promise<any> {
    postData = Object.assign(postData, this.token);
    this.ServiceCryptography.reqSignup(postData).subscribe(
      async (data: any) => {
        localStorage.setItem('token', data.token);
        Object.assign(this.token, this.jwtHelper.decodeToken(data.token));
        this.referrals = this.token.user.referrals;
      }
    );
  }

  setCurrentUser(decodedToken): void {
    this.currentUser = new ModelUser();
    this.loggedIn = true;
    this.currentUser.email = decodedToken.user.email;
  }
}
