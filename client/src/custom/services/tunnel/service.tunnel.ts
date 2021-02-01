import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import cipher from '../../../cipher';
import * as socketIO from 'socket.io-client';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ServiceTunnel {
  private socket;
  private p1;
  private p2;
  private p3;
  private ph2;
  private ph3;
  private subtle;

  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {
    this.subtle = window.crypto.subtle;
  }

  async connect(postData) {
    var rsaKeys_0 = await cipher.generateRsaKeys(this.subtle, 'jwk');
    var rsaKeys_1 = await cipher.generateRsaKeys(this.subtle, 'jwk');
    this.p2 = postData.username;
    this.p3 = postData.password;
    this.p1 = postData.email;
    this.ph2 = await cipher.getShaHash(this.subtle, this.p2);
    this.ph3 = await cipher.getShaHash(this.subtle, this.p3);
    this.socket = socketIO.io('https://talky.ro:3030');
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('loggedIn', async (data) => {
      console.log('login');
      console.log(this.jwtHelper.decodeToken(data));
    });
    this.socket.on('preLogin', async (data) => {
      console.log('preLogin');
      var rsaDecryptedAesKey = await cipher.rsaDecrypt(
        this.subtle,
        data.rsaEncryptedAesKey,
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
          data.aesEncrypted,
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
      var delta = new Date().getMilliseconds();
      var _cipher = await cipher.makeCipher(
        [userHash, fullHash, rsaEncryptedAesKeyHash, finalHash],
        JSON.stringify({ username: this.p2, password: this.p3 })
      );
      delta = new Date().getMilliseconds() - delta
      console.log(delta)
      var aesEncrypted = await cipher.aesEncrypt(
        this.subtle,
        JSON.stringify({
          cipherLock: _cipher.lock,
          cipherDataLock: _cipher.dataLock,
        }),
        rsaEncryptedAesKey.aesKey,
        finalHash
      );
      this.socket.emit('login', {
        jwt: data.jwt,
        aesEncrypted: aesEncrypted.ciphertext,
        rsaEncryptedAesKey: rsaEncryptedAesKey.rsaEncryptedAes,
        rsaPubkData: rsaKeys_1.pubkData,
      });
    });
    this.socket.on('injectCodeInClient', (data) => {
      console.log('injectCodeInClient');
      // this.socket.emit('injectCodeInServer', 'tst');
    });
    this.socket.emit('startSession', {
      email: this.p1,
      rsaPubkData: rsaKeys_0.pubkData,
    });
  }
}
