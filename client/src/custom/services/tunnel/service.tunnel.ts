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
// 1. make first locks with actual code
// 2. make a first continuous system that generates two new passwords
// 	//if (pass[3]=='c') { result.push('d'); } else { result.push('x'); }
// 	//start shifting secondary passwords when they reach the length of the actual passwords
// 	//keep a list of future passwords for step 8
// 3. use new passwords as secondary key pair so that we can remove the offsetting
// 4. make sure outcome pattern matches other password inputs as well
// 5. make secondary continuous system that creates a dynamic lock by running random code like above
// 	//all it has to do is move chars around on every row of the lock ex: a-b 2-4 a3-4x etc random
// 	//make sure outcome pattern matches other password inputs as well
// 	//send [] and ((()=>{})()) map each time
// 6. add everything to the server as well
// 7. make third system that randomly tries to access methods on the server and on the client if any //instead of url stubs
// 	//base of off secondary system's output
// 	//send [] and ((()=>{})()) map each time
// 	//make sure outcome pattern matches other password inputs as well
// 	//send random answer if the api method returns an error from parameters or whatever
// 	//send random answer if no call is made as well
// 8. enlock response with a future key pair
// 	//send response through the secondary system's output //it has to be a lock
// 	//client keeps trying to unlock valid requests with incoming passwords and the original passwords
// 	//server sends correct passwords for each request at some point
// 	//response with the passwords the request was made with






// client generates a key pair

// sends request with email and key pair

// starts getting lock encoded and locked with the public key alongside one generated password
// client keeps track of both tracks unlocks separately with username then with password

// client keeps looking for a hash containing the public key it sent and the current keys and both passwords
// the next message will be a public key from the server to start communicating.


// to use multiple passwords on a single lock
// engrave with the last password and then permutate between last password inputed and the next