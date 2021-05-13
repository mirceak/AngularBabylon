import { Injectable, NgZone } from '@angular/core';
import _Cryptography from '../../../kernel/module.cryptography';

import { TranslateService } from '@ngx-translate/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceModals } from './service.modals';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {
  lang = 'en';

  public stateSubject = new Subject<any>();
  protected initialState: any = {
    language: 'en',
    mailBoxes: [],
    referrals: [],
  };
  public state: any = {
    language: new BehaviorSubject<any>(this.initialState.language),
    mailBoxes: new BehaviorSubject<any>(this.initialState.mailBoxes),
    referrals: new BehaviorSubject<any>(this.initialState.referrals),
  };

  public crypto = {
    lock: [],
    dataLock: [],
    password: '',
    basePassword: '',
    output: '',
  };

  public loggedIn = new BehaviorSubject<any>(null);
  public statePassword = new Subject<any>();
  public token = new BehaviorSubject<any>(null);
  public sessionToken = new BehaviorSubject<any>(null);
  public socketToken = new BehaviorSubject<any>(null);
  public decryptedToken = new ReplaySubject<any>();
  public Cryptography: _Cryptography = new _Cryptography(window.crypto);

  constructor(
    public translate: TranslateService,
    public jwtHelper: JwtHelperService,
    public serviceModals: ServiceModals,
    public router: Router,
    public zone: NgZone
  ) {
    if (!localStorage.getItem('crypto')) {
      Object.assign(this.crypto, this.Cryptography.makeCipherPieces(1000));
      this.crypto.basePassword = [...Array(1000)]
        .map((i) => (~~(Math.random() * 2 ** 36)).toString(36))
        .join('');
      localStorage.setItem('crypto', JSON.stringify(this.crypto));
    } else {
      Object.assign(
        this.crypto,
        JSON.parse(`${localStorage.getItem('crypto')}`)
      );
    }

    if (localStorage.getItem('sessionToken')) {
      this.sessionToken.next(
        JSON.parse(localStorage.getItem('sessionToken') || '')
      );
    }

    this.statePassword.subscribe(this.encryptAndSaveState.bind(this));
  }

  async decryptStateWithEncryptedPass(encryptedStatePassword: string): Promise<void> {
    const statePassword = this.Cryptography.degraveData(
      this.crypto.lock,
      this.crypto.dataLock,
      encryptedStatePassword,
      this.crypto.basePassword
    );
    this.crypto.password = statePassword;
    this.decryptState(statePassword);
  }

  async decryptState(statePassword: string): Promise<void> {
    const state = JSON.parse(
      decodeURIComponent(
        escape(
          atob(
            this.Cryptography.degraveData(
              this.crypto.lock,
              this.crypto.dataLock,
              localStorage.getItem('encryptedState'),
              statePassword
            )
          )
        )
      )
    );
    Object.keys(this.state).forEach((key) => {
      this.state[key].next(state[key]);
    });
  }

  async encryptAndSaveState(statePassword: string): Promise<void> {
    const state = Object.keys(this.state).reduce((total: any, key: string) => {
      total[key] = this.state[key].value;
      return total;
    }, {});
    const output = this.Cryptography.engraveData(
      this.crypto.lock,
      this.crypto.dataLock,
      statePassword,
      btoa(unescape(encodeURIComponent(JSON.stringify(state))))
    );
    localStorage.setItem('encryptedState', output);
  }

  logout(): void {
    Object.keys(this.initialState).forEach((key) => {
      this.state[key].next(this.initialState[key]);
    });
    this.token.next(null);
    this.sessionToken.next(null);
    this.socketToken.next(null);
    this.loggedIn.next(null);
    localStorage.setItem('crypto', JSON.stringify(this.crypto));
  }

  async getRequestData(postData: any, token: any): Promise<any> {
    const nextRsa = await this.Cryptography.generateRsaKeys('jwk');
    const rsaEncryptedAes = await this.Cryptography.getRsaEncryptedAesKey(
      token.value.nextRsa
    );
    const aesEncrypted = await this.Cryptography.aesEncrypt(
      JSON.stringify({
        data: postData,
        nextRsa: nextRsa.pubkData,
      }),
      rsaEncryptedAes.aesKey,
      token.value.nextRsa
    );
    return {
      nextRsa,
      rsaEncryptedAes,
      aesEncrypted,
    };
  }

  async decryptServerData(
    data: any,
    nextRsa: any,
    token: any = this.token
  ): Promise<any> {
    return new Promise(
      async (resolve, reject): Promise<any> => {
        data.rsaEncryptedAes = this.Cryptography.str2ab(data.rsaEncryptedAes);
        data.aesEncrypted = this.Cryptography.str2ab(data.aesEncrypted);
        const decryptedAes = await this.Cryptography.rsaDecrypt(
          data.rsaEncryptedAes,
          nextRsa.privateKey
        );
        const aesKey = await this.Cryptography.importAesKey(decryptedAes);
        let decryptedToken: any = await this.Cryptography.aesDecrypt(
          data.aesEncrypted,
          aesKey,
          nextRsa.pubkData
        );

        const parsedToken = JSON.parse(decryptedToken);
        if (token === this.token) {
          // main token stream
          // not socket token stream
          decryptedToken = this.jwtHelper.decodeToken(parsedToken.token);
          this.token.next(decryptedToken);
        }

        resolve({
          parsedToken,
          decryptedToken,
          decryptedAes,
          aesKey,
        });
      }
    );
  }
}
