import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import tunnel from '../../../tunnel';
import * as socketIO from 'socket.io-client';

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

  constructor(private http: HttpClient) {
    this.subtle = window.crypto.subtle;
  }

  async connect(postData) {
    var rsaKeys_0 = await tunnel.generateRsaKeys(this.subtle);
    this.p2 = postData.username;
    this.p3 = postData.password;
    this.p1 = postData.email;
    this.ph2 = await tunnel.getShaHash(this.subtle, this.p2);
    this.socket = socketIO.io('http://localhost:3030');
    this.socket.on('connect', () => {
      console.log('connect');
    });
    this.socket.on('requestHomomorphic', async (data) => {
      console.log('requestHomomorphic', data);

      var rsaDecryptedAesKey = await tunnel.rsaDecrypt(this.subtle, data.rsaEncryptedAesKey, rsaKeys_0.privateKey)
      var aesKey = await tunnel.importAesKey(this.subtle, rsaDecryptedAesKey)
      var decryptedAes = JSON.parse(await tunnel.aesDecrypt(this.subtle, data.aesEncrypted, aesKey, 'someRandomIvThatNeedsChaning'))
      var homoEncrypted = await tunnel.homoEncrypt(decryptedAes.homoPubkData, JSON.stringify({ username: 'user.username', password: 'user.password' }))
      
      this.socket.emit('sendHomomorphic', {
        homoEncrypted: homoEncrypted
      })
    });
    this.socket.on('injectCodeInClient', (data) => {
      console.log('injectCodeInClient');
      this.socket.emit('injectCodeInServer', 'tst');
    });
    this.socket.emit('startSession', {
      email: this.p1,
      rsaPubkData: rsaKeys_0.pubkData,
    });
  }
}
