import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import tunnel from '../../../tunnel';
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
    var rsaKeys_0 = await tunnel.generateRsaKeys(this.subtle, 'jwk');
    var rsaKeys_1 = await tunnel.generateRsaKeys(this.subtle, 'jwk');
    this.p2 = postData.username;
    this.p3 = postData.password;
    this.p1 = postData.email;
    this.ph2 = await tunnel.getShaHash(this.subtle, this.p2);
    this.ph3 = await tunnel.getShaHash(this.subtle, this.p3);
    this.socket = socketIO.io('https://talky.ro:3030');
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('loggedIn', async (data) => {
      console.log('login', data);
      console.log(this.jwtHelper.decodeToken(data));
    });
    this.socket.on('requestHomomorphic', async (data) => {
      console.log('requestHomomorphic', data);
      var rsaDecryptedAesKey = await tunnel.rsaDecrypt(
        this.subtle,
        data.rsaEncryptedAesKey,
        rsaKeys_0.privateKey
      );
      var aesKey = await tunnel.importAesKey(this.subtle, rsaDecryptedAesKey);
      var userHash = await tunnel.getShaHash(
        this.subtle,
        JSON.stringify({
          initialRsaPubkData: rsaKeys_0.pubkData,
          initialAesPubkData: rsaDecryptedAesKey,
        })
      );
      var decryptedAes = JSON.parse(
        await tunnel.aesDecrypt(
          this.subtle,
          data.aesEncrypted,
          aesKey,
          userHash
        )
      );
      var rsaEncryptedAesKey = await tunnel.getRsaEncryptedAesKey(
        this.subtle,
        decryptedAes.rsaPubkData
      );
      var fullHash = await tunnel.getShaHash(
        this.subtle,
        await tunnel.getShaHash(
          this.subtle,
          JSON.stringify({
            username: this.ph2,
            password: this.ph3,
            initialRsaPubkData: rsaKeys_0.pubkData,
            initialAesPubkData: rsaDecryptedAesKey,
          }).substr(0, 6)
        )
      );
      var totalHash = await tunnel.getShaHash(
        this.subtle,
        JSON.stringify({
          fullHash: fullHash,
          userHash: userHash,
          rsaPubkData: rsaKeys_1.pubkData,
          rsaEncryptedAesKey: new TextDecoder().decode(
            rsaEncryptedAesKey.rsaEncryptedAes
          ),
        })
      );
      var rsaEncryptedAesKeyHash = await tunnel.getShaHash(
        this.subtle,
        new TextDecoder().decode(rsaEncryptedAesKey.rsaEncryptedAes)
      );
      var hCryptCipher = await tunnel.generateCipher(
        decryptedAes.hCryptPubkData,
        []
      );
      var homoEncrypted = await tunnel.hCryptAdd(
        decryptedAes.hCryptPubkData,
        hCryptCipher,
        JSON.stringify({ username: this.p2, password: this.p3 })
      );
      var _tunnel = await tunnel.makeTunnel(
        [userHash, fullHash, rsaEncryptedAesKeyHash, totalHash],
        homoEncrypted
      );
      var aesEncrypted = await tunnel.aesEncrypt(
        this.subtle,
        JSON.stringify({
          tunnelLock: _tunnel.lock,
          tunnelDataLock: _tunnel.dataLock,
        }),
        rsaEncryptedAesKey.aesKey,
        totalHash
      );
      this.socket.emit('sendHomomorphic', {
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
