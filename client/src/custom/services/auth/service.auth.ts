import { HostListener, Injectable, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelUser } from '@custom/entities/user/model/model.user';
import { ServiceApi } from '@custom/services/api/service.api';
import _Cryptography from '../../../cryptography';
import * as socketIO from 'socket.io-client';
import { ServiceModals } from '../utils/service.modals';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    event.preventDefault();
    this.socket.disconnect();
  }

  private Cryptography: _Cryptography = new _Cryptography(window.crypto);
  private token: any;
  private socket;
  public referrals: any;
  public mailBoxes: any;
  public messageQueue: any;
  public loggedIn = false;
  currentUser: ModelUser = null;
  constructor(
    private ServiceApi: ServiceApi,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private zone: NgZone,
    private serviceModals: ServiceModals,
    private translate: TranslateService
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
    this.messageQueue = [];
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
    return new Promise(async (resolve) => {
      postData.email = await this.Cryptography.getShaHash(postData.email);
      var firstRsaKeys = await this.Cryptography.generateRsaKeys('jwk');
      this.ServiceApi.requestLogin({
        email: postData.email,
        rsaPubkData: firstRsaKeys.pubkData,
      }).subscribe(async (response: any) => {
        postData = Object.assign(postData, response, {
          firstRsaKeys: firstRsaKeys,
        });
        postData.nextRsa = await this.Cryptography.generateRsaKeys('jwk');
        this.ServiceApi.login(
          await this.Cryptography.signLoginSessionData(postData)
        ).subscribe(async (data: any) => {
          await this.decryptServerData(data, postData.nextRsa, true);
          this.zone.run(() => {
            this.router.navigate(['/']);
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
    this.socket.disconnect();
    this.socket = null;
    this.referrals.length = 0;
    this.mailBoxes.length = 0;
    this.router.navigate(['/auth/login']);
  }

  async register(postData): Promise<any> {
    return new Promise(async (resolve) => {
      var firstRsaKeys = await this.Cryptography.generateRsaKeys('jwk');
      this.ServiceApi.requestRegister({
        email: postData.email,
        rsaPubkData: firstRsaKeys.pubkData,
      }).subscribe(async (response: any) => {
        postData = Object.assign(postData, response, {
          firstRsaKeys: firstRsaKeys,
        });
        postData.nextRsa = await this.Cryptography.generateRsaKeys('jwk');
        this.ServiceApi.register(
          await this.Cryptography.signRegisterSessionData(postData)
        ).subscribe(async (data: any) => {
          await this.decryptServerData(data, postData.nextRsa, true);
          this.zone.run(() => {
            this.router.navigate(['/']);
            resolve(null);
          });
        });
      });
    });
  }

  async reqSignup(postData): Promise<any> {
    return new Promise(async (resolve) => {
      var reqData = await this.getRequestData(postData);
      this.ServiceApi.reqSignup({
        sessionJwt: this.token.sessionJwt,
        rsaEncryptedAes: await this.Cryptography.ab2str(
          reqData.rsaEncryptedAes.encryptedAes
        ),
        aesEncrypted: await this.Cryptography.ab2str(
          reqData.aesEncrypted.ciphertext
        ),
      }).subscribe(async (data: any) => {
        var decryptedData = await this.decryptServerData(data, reqData.nextRsa);
        this.zone.run(() => {
          this.referrals.push(decryptedData.decryptedToken.data);
          localStorage.setItem('referrals', JSON.stringify(this.referrals));
          resolve(null);
        });
      });
    });
  }
  async accMailBox(postData): Promise<any> {
    return new Promise(async (resolve) => {
      var reqData = await this.getRequestData(postData);
      this.ServiceApi.getMailBox({
        save: true,
        sessionJwt: this.token.sessionJwt,
        rsaEncryptedAes: await this.Cryptography.ab2str(
          reqData.rsaEncryptedAes.encryptedAes
        ),
        aesEncrypted: await this.Cryptography.ab2str(
          reqData.aesEncrypted.ciphertext
        ),
      }).subscribe(async (data: any) => {
        var decryptedData = await this.decryptServerData(data, reqData.nextRsa);
        decryptedData.decryptedToken.data.name = postData.name;
        var remoteRsaPubkData =
          decryptedData.decryptedToken.data.messages.local[0];
        var secret3 = [...Array(512)]
          .map((i) => (~~(Math.random() * 36)).toString(36))
          .join('');
        var remoteRsa = await this.Cryptography.generateRsaKeys('jwk');
        var rsaEncryptedAes = await this.Cryptography.getRsaEncryptedAesKey(
          remoteRsaPubkData
        );
        var aesEncrypted = await this.Cryptography.aesEncrypt(
          JSON.stringify({
            secret: secret3,
            nextRsa: remoteRsa.pubkData,
          }),
          rsaEncryptedAes.aesKey,
          remoteRsaPubkData
        );
        postData.messages = decryptedData.decryptedToken.data.messages;
        postData.messages.local = [];
        postData.messages.remote = [
          await this.Cryptography.ab2str(rsaEncryptedAes.encryptedAes),
          await this.Cryptography.ab2str(aesEncrypted.ciphertext),
        ];
        //update messages with new data.
        reqData = await this.getRequestData(postData);
        this.ServiceApi.setMailBox({
          sessionJwt: this.token.sessionJwt,
          rsaEncryptedAes: await this.Cryptography.ab2str(
            reqData.rsaEncryptedAes.encryptedAes
          ),
          aesEncrypted: await this.Cryptography.ab2str(
            reqData.aesEncrypted.ciphertext
          ),
        }).subscribe(async (data: any) => {
          decryptedData = await this.decryptServerData(data, reqData.nextRsa);
          decryptedData.decryptedToken.data.name = postData.name;
          decryptedData.decryptedToken.data.secret3 = secret3;
          decryptedData.decryptedToken.data.remote = true;
          decryptedData.decryptedToken.data.privkData = remoteRsa.privkData;
          decryptedData.decryptedToken.data.pubkData = remoteRsa.pubkData;
          decryptedData.decryptedToken.data.nextRsa = remoteRsaPubkData;
          decryptedData.decryptedToken.data.aesPubkData =
            rsaEncryptedAes.aesPubkData;
          this.zone.run(() => {
            this.mailBoxes.push(decryptedData.decryptedToken.data);
            localStorage.setItem('mailBoxes', JSON.stringify(this.mailBoxes));
            resolve(null);
          });
        });
      });
    });
  }
  async sendMessage(postData, mailBox): Promise<any> {
    postData.secret1 = mailBox._id;
    postData.secret2 = mailBox.secret;
    postData.secret3 = mailBox.secret3;
    if (postData.message) {
      postData.message = {
        content: postData.message,
        remote: mailBox.remote,
        timeStamp: new Date().getTime(),
      };
    }
    var reqData = await this.getRequestData(postData);
    this.ServiceApi.setMailBox({
      sessionJwt: this.token.sessionJwt,
      rsaEncryptedAes: await this.Cryptography.ab2str(
        reqData.rsaEncryptedAes.encryptedAes
      ),
      aesEncrypted: await this.Cryptography.ab2str(
        reqData.aesEncrypted.ciphertext
      ),
    }).subscribe(async (data: any) => {
      var decryptedData = await this.decryptServerData(data, reqData.nextRsa);
      var mailBoxIndex = this.mailBoxes.findIndex((mailBox) => {
        return mailBox._id == decryptedData.decryptedToken.data._id;
      });
      this.zone.run(() => {
        Object.assign(this.mailBoxes[mailBoxIndex], {
          messages: decryptedData.decryptedToken.data.messages,
        });
        if (
          this.mailBoxes[mailBoxIndex].reactiveCallbacks &&
          this.mailBoxes[mailBoxIndex].reactiveCallbacks.length
        ) {
          this.mailBoxes[mailBoxIndex].reactiveCallbacks.forEach((callback) => {
            if (callback) callback();
          });
        }
        localStorage.setItem('mailBoxes', JSON.stringify(this.mailBoxes));
      });
    });
  }
  async reqMailBox(postData): Promise<any> {
    return new Promise(async (resolve) => {
      var mailBoxRsa = await this.Cryptography.generateRsaKeys('jwk');
      postData.message = mailBoxRsa.pubkData;
      postData.secret = [...Array(20)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join('');
      var reqData = await this.getRequestData(postData);
      this.ServiceApi.reqMailBox({
        sessionJwt: this.token.sessionJwt,
        rsaEncryptedAes: await this.Cryptography.ab2str(
          reqData.rsaEncryptedAes.encryptedAes
        ),
        aesEncrypted: await this.Cryptography.ab2str(
          reqData.aesEncrypted.ciphertext
        ),
      }).subscribe(async (data: any) => {
        var decryptedData = await this.decryptServerData(data, reqData.nextRsa);
        decryptedData.decryptedToken.data.name = postData.name;
        decryptedData.decryptedToken.data.remote = false;
        decryptedData.decryptedToken.data.privkData = mailBoxRsa.privkData;
        decryptedData.decryptedToken.data.pubkData = mailBoxRsa.pubkData;
        this.zone.run(() => {
          this.mailBoxes.push(decryptedData.decryptedToken.data);
          localStorage.setItem('mailBoxes', JSON.stringify(this.mailBoxes));
          resolve(null);
        });
      });
    });
  }

  setCurrentUser(decodedToken): void {
    this.currentUser = new ModelUser();
    this.loggedIn = true;
    this.socket = socketIO.io('https://talky.ro:5050', {
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', () => {
      this.socket.emit('identification', {
        sessionJwt: localStorage.getItem('token'),
      });
    });
    this.socket.on('verification', async (data) => {
      data.clientMsgId = Date.now().toString();
      var reqData = await this.getRequestData(data);
      this.messageQueue.push({ id: data.clientMsgId, rsa: reqData.nextRsa });
      this.socket.emit('verify', {
        sessionJwt: this.token.sessionJwt,
        rsaEncryptedAes: await this.Cryptography.ab2str(
          reqData.rsaEncryptedAes.encryptedAes
        ),
        aesEncrypted: await this.Cryptography.ab2str(
          reqData.aesEncrypted.ciphertext
        ),
      });
    });
    this.socket.on('updateMailBox', async (data) => {
      var messageIndex = this.messageQueue.findIndex((message) => {
        return message.id == data.clientMsgId;
      });
      var message = this.messageQueue.splice(messageIndex, 1)[0];
      var decryptedData = await this.decryptServerData(data, message.rsa);
      var mailBoxIndex;
      if (decryptedData.decryptedToken.data.mailBox) {
        mailBoxIndex = this.mailBoxes.findIndex((mailBox) => {
          return mailBox._id == decryptedData.decryptedToken.data.mailBox._id;
        });
      } else if (decryptedData.decryptedToken.data.mailBoxes) {
        decryptedData.decryptedToken.data.mailBoxes.forEach((mailBox) => {
          var localMailbox = this.mailBoxes[
            this.mailBoxes.findIndex((_mailBox) => {
              return _mailBox._id == mailBox._id;
            })
          ];
          if (
            localMailbox.reactiveCallbacks &&
            localMailbox.reactiveCallbacks.length
          ) {
            localMailbox.reactiveCallbacks.forEach((callback) => {
              if (callback) callback();
            });
          }
          Object.assign(localMailbox, { messages: mailBox.messages });
        });
        this.zone.run(() => {
          Object.assign(this.mailBoxes, {});
        });
        localStorage.setItem('mailBoxes', JSON.stringify(this.mailBoxes));
        return;
      }

      var mailBox = this.mailBoxes[mailBoxIndex];
      if (mailBox.reactiveCallbacks && mailBox.reactiveCallbacks.length) {
        mailBox.reactiveCallbacks.forEach((callback) => {
          if (callback) callback();
        });
      }
      mailBox.messages =
        decryptedData.decryptedToken.data.mailBox.messages || mailBox.messages;
      if (
        mailBox.remote == false &&
        mailBox.secret3 == null &&
        mailBox.messages.remote != null
      ) {
        this.serviceModals.showToast({
          status: 'success',
          statusMessage: this.translate.instant('components.toastr.success'),
          title: this.translate.instant('pages.mailBox.acceptedRemote', {
            name: mailBox.name,
          }),
        });
        var mailBoxKey = await this.Cryptography.importRsaKey(
          mailBox.privkData
        );
        var rsaDecryptedAesKey = await this.Cryptography.rsaDecrypt(
          await this.Cryptography.str2ab(mailBox.messages.remote[0]),
          mailBoxKey
        );
        var aesKey = await this.Cryptography.importAesKey(rsaDecryptedAesKey);
        var aesDecrypted = JSON.parse(
          await this.Cryptography.aesDecrypt(
            await this.Cryptography.str2ab(mailBox.messages.remote[1]),
            aesKey,
            mailBox.pubkData
          )
        );
        mailBox.aesPubkData = rsaDecryptedAesKey;
        mailBox.secret3 = aesDecrypted.secret;
        mailBox.nextRsa = aesDecrypted.nextRsa;
        mailBox.messages.remote.length = 0;

        this.sendMessage({ messages: mailBox.messages }, mailBox);
      } else {
        this.zone.run(() => {
          Object.assign(this.mailBoxes, {});
        });
        localStorage.setItem('mailBoxes', JSON.stringify(this.mailBoxes));
      }
    });
  }
}
