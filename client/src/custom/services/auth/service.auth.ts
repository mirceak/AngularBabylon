import { Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelUser } from '@custom/entities/user/model/model.user';
import { ServiceCryptography } from '@custom/services/cryptography/service.cryptography';
import _Cryptography from '../../../cryptography';
import * as socketIO from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  private Cryptography: _Cryptography = new _Cryptography(window.crypto);
  private token: any;
  private socket;
  public referrals: any;
  public mailBoxes: any;
  public loggedIn = false;
  currentUser: ModelUser = null;
  constructor(
    private ServiceCryptography: ServiceCryptography,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private zone: NgZone
  ) {
    this.token = localStorage.getItem('token');
    this.referrals = localStorage.getItem('referrals');
    this.mailBoxes = localStorage.getItem('mailBoxes');
    if (this.token) {
      this.token = this.jwtHelper.decodeToken(this.token);
      this.setCurrentUser(this.token);
    }

    if (!this.referrals) {
      this.referrals = '[]';
      localStorage.setItem('referrals', this.referrals);
    }
    if (!this.mailBoxes) {
      this.mailBoxes = '[]';
      localStorage.setItem('mailBoxes', this.mailBoxes);
    }

    this.referrals = JSON.parse(this.referrals);
    this.mailBoxes = JSON.parse(this.mailBoxes);
  }

  async decryptServerData(data, nextRsa, isLogin = false) {
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

    if (isLogin) {
      localStorage.setItem('token', decryptedToken);
      this.token = this.jwtHelper.decodeToken(decryptedToken);
      this.setCurrentUser(this.token);
    } else {
      decryptedToken = JSON.parse(decryptedToken);
    }

    return {
      decryptedToken: decryptedToken,
      decryptedAes: decryptedAes,
      aesKey: aesKey,
    };
  }

  async login(postData): Promise<any> {
    var firstRsaKeys = await this.Cryptography.generateRsaKeys('jwk');
    this.ServiceCryptography.requestLogin({
      email: postData.email,
      rsaPubkData: firstRsaKeys.pubkData,
    }).subscribe(async (response: any) => {
      postData = Object.assign(postData, response, {
        firstRsaKeys: firstRsaKeys,
      });
      postData.nextRsa = await this.Cryptography.generateRsaKeys('jwk');
      this.ServiceCryptography.login(
        await this.Cryptography.signLoginSessionData(postData)
      ).subscribe(async (data: any) => {
        await this.decryptServerData(data, postData.nextRsa, true);
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
    this.socket.disconnect();
    this.socket = null;
    this.referrals.length = 0;
    this.mailBoxes.length = 0;
  }

  async register(postData): Promise<any> {
    var firstRsaKeys = await this.Cryptography.generateRsaKeys('jwk');
    this.ServiceCryptography.requestRegister({
      email: postData.email,
      rsaPubkData: firstRsaKeys.pubkData,
    }).subscribe(async (response: any) => {
      postData = Object.assign(postData, response, {
        firstRsaKeys: firstRsaKeys,
      });
      postData.nextRsa = await this.Cryptography.generateRsaKeys('jwk');
      this.ServiceCryptography.register(
        await this.Cryptography.signRegisterSessionData(postData)
      ).subscribe(async (data: any) => {
        await this.decryptServerData(data, postData.nextRsa, true);
        this.zone.run(() => {
          this.router.navigate(['/']);
        });
      });
    });
  }
  async getRequestData(postData) {
    var nextRsa = await this.Cryptography.generateRsaKeys('jwk');
    var rsaEncryptedAes = await this.Cryptography.getRsaEncryptedAesKey(
      this.token.nextRsa
    );
    var aesEncrypted = await this.Cryptography.aesEncrypt(
      JSON.stringify({ data: postData, nextRsa: nextRsa.pubkData }),
      rsaEncryptedAes.aesKey,
      this.token.nextRsa
    );
    return {
      nextRsa,
      rsaEncryptedAes,
      aesEncrypted,
    };
  }

  async reqSignup(postData): Promise<any> {
    var reqData = await this.getRequestData(postData);
    this.ServiceCryptography.reqSignup({
      sessionJwt: this.token.sessionJwt,
      rsaEncryptedAes: await this.Cryptography.ab2str(
        reqData.rsaEncryptedAes.rsaEncryptedAes
      ),
      aesEncrypted: await this.Cryptography.ab2str(
        reqData.aesEncrypted.ciphertext
      ),
    }).subscribe(async (data: any) => {
      var decryptedData = await this.decryptServerData(data, reqData.nextRsa);
      this.zone.run(() =>
        this.referrals.push(decryptedData.decryptedToken.data)
      );
      localStorage.setItem('referrals', JSON.stringify(this.referrals));
    });
  }
  async accMailBox(postData): Promise<any> {
    var reqData = await this.getRequestData(postData);
    this.ServiceCryptography.getMailBox({
      save: true,
      sessionJwt: this.token.sessionJwt,
      rsaEncryptedAes: await this.Cryptography.ab2str(
        reqData.rsaEncryptedAes.rsaEncryptedAes
      ),
      aesEncrypted: await this.Cryptography.ab2str(
        reqData.aesEncrypted.ciphertext
      ),
    }).subscribe(async (data: any) => {
      var decryptedData = await this.decryptServerData(data, reqData.nextRsa);
      decryptedData.decryptedToken.data.name = postData.name;
      var secret3 = [...Array(512)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join('');
      var remoteRsa = await this.Cryptography.generateRsaKeys('jwk');
      var rsaEncryptedAes = await this.Cryptography.getRsaEncryptedAesKey(
        decryptedData.decryptedToken.data.messages.local[0]
      );
      var aesEncrypted = await this.Cryptography.aesEncrypt(
        JSON.stringify({
          secret: secret3,
          nextRsa: remoteRsa.pubkData,
        }),
        rsaEncryptedAes.aesKey,
        decryptedData.decryptedToken.data.messages.local[0]
      );
      postData.messages = decryptedData.decryptedToken.data.messages;
      postData.messages.local = [];
      postData.messages.remote = [
        await this.Cryptography.ab2str(aesEncrypted.ciphertext),
      ];
      //update messages with new data.
      reqData = await this.getRequestData(postData);
      this.ServiceCryptography.setMailBox({
        sessionJwt: this.token.sessionJwt,
        rsaEncryptedAes: await this.Cryptography.ab2str(
          reqData.rsaEncryptedAes.rsaEncryptedAes
        ),
        aesEncrypted: await this.Cryptography.ab2str(
          reqData.aesEncrypted.ciphertext
        ),
      }).subscribe(async (data: any) => {
        decryptedData = await this.decryptServerData(data, reqData.nextRsa);
        decryptedData.decryptedToken.data.name = postData.name;
        this.zone.run(() =>
          this.mailBoxes.push(decryptedData.decryptedToken.data)
        );
        localStorage.setItem('mailBoxes', JSON.stringify(this.mailBoxes));
      });
    });
  }
  async reqMailBox(postData): Promise<any> {
    var mailBoxRsa = await this.Cryptography.generateRsaKeys('jwk');
    postData.message = mailBoxRsa.pubkData;
    var reqData = await this.getRequestData(postData);
    this.ServiceCryptography.reqMailBox({
      sessionJwt: this.token.sessionJwt,
      rsaEncryptedAes: await this.Cryptography.ab2str(
        reqData.rsaEncryptedAes.rsaEncryptedAes
      ),
      aesEncrypted: await this.Cryptography.ab2str(
        reqData.aesEncrypted.ciphertext
      ),
    }).subscribe(async (data: any) => {
      var decryptedData = await this.decryptServerData(data, reqData.nextRsa);
      decryptedData.decryptedToken.data.name = postData.name;
      this.zone.run(() =>
        this.mailBoxes.push(decryptedData.decryptedToken.data)
      );
      localStorage.setItem('mailBoxes', JSON.stringify(this.mailBoxes));
    });
  }

  setCurrentUser(decodedToken): void {
    console.log(decodedToken);
    this.currentUser = new ModelUser();
    this.loggedIn = true;
    this.socket = socketIO.io('https://talky.ro:3030', {
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('message', async (data) => {});
  }
}
