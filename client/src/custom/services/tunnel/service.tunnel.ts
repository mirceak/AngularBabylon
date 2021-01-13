import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import tunnel from '../../../tunnel';
import CryptoJs from 'crypto-js';
import * as socketIO from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ServiceTunnel {
  private hmac;
  private socket;
  private p1;
  private p2;
  private p3;
  private ph1;
  private ph2;
  private ph3;

  constructor(private http: HttpClient) {}

  getHash(key, msg) {
    this.hmac = CryptoJs.algo.HMAC.create(CryptoJs.algo.SHA512, key);
    this.hmac.update(msg);
    return CryptoJs.enc.Base64.stringify(
      CryptoJs.enc.Hex.parse(this.hmac.finalize().toString())
    );
  }

  connect(postData): void {
    this.p1 = postData.email;
    this.p2 = postData.username;
    this.p3 = postData.password;

    this.ph1 = this.getHash(this.p2, this.p1);
    this.ph2 = this.getHash(this.p3, this.p2);
    this.ph3 = this.getHash(this.p1, this.p3);

    this.socket = socketIO.io('http://localhost:3030');

    this.socket.on('connect', () => {
      console.log('connected to tunnel socket:', this.socket.id);
    });
    this.socket.on('injectCodeInClient', (data) => {
      //do checks for code and emit random calls
      this.socket.emit('injectCodeInServer', 'tst');
    });
    //initiate the session by requesting code for the account of @email
    this.socket.emit('startSession', { email: this.p1 });
  }

  tunnel(data, p1, p2, p3): void {
    data.lock = tunnel.fromString(data.lock);
    data.dataLock = tunnel.fromString(data.dataLock);

    var clientLock = tunnel.makeClientLock(this.p1, this.p2, this.p3, data);
  }
}


//send lock alongside visible character map to be used with the unlocked code
//keep executing blocks of code on the client
//expose a list of methods the server's code can access
//make sure server can inject code that reaches back to it by injecting string in the next request's var
