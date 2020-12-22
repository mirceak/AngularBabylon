import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelUser } from '@custom/entities/user/model/model.user';
import { ServiceUser } from '@custom/entities/user/service/service.user';
import { VirtualProcessService } from '@custom/services/vproc/virtual-process.service';
import CryptoJs from 'crypto-js';
import tunnel from '../../../tunnel';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {
  loggedIn = false;
  roles: any = {
    guest: true,
  };

  currentUser: ModelUser = new ModelUser();
  hashLen = 88;

  getHash(key, msg) {
    var hmac = CryptoJs.algo.HMAC.create(CryptoJs.algo.SHA512, key);
    hmac.update(msg);
    return CryptoJs.enc.Base64.stringify(
      CryptoJs.enc.Hex.parse(hmac.finalize().toString())
    );
  }
  constructor(
    private serviceUser: ServiceUser,
    private virtualProcess: VirtualProcessService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
      console.log(decodedUser);
    }

    this.virtualProcess.connect().subscribe(
      (data) => {
        var p1 = 'pass1';
        var p2 = 'pass2';
        var p3 = 'pass3';
        data.lock = tunnel.fromString(data.lock);
        data.dataLock = tunnel.fromString(data.dataLock);

        var clientLock = tunnel.makeClientLock(this.getHash(p2, p1), this.getHash(p3, p2), this.getHash(p1, p3), data);

        var postData = {
          finalLock: tunnel.toString(clientLock.lock),
          dataLock: tunnel.toString(clientLock.dataLock),
        };
        this.virtualProcess.lock(postData).subscribe(
          (data) => {
            console.log(tunnel.unlockMessage(data.encrypted, clientLock.innerLock));
          },
          (error) => console.log('tunnel post', error)
        );
      },
      (error) => console.log('tunnel get', error)
    );
  }

  login(emailAndPassword): void {
    this.serviceUser.login(emailAndPassword).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        this.loggedIn = true;
        this.router.navigate(['/']);
      },
      (error) => console.log('invalid email or password!', 'danger')
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.roles.admin = false;
    this.currentUser = new ModelUser();
    this.router.navigate(['/login']);
  }

  decodeUserFromToken(token): object {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser): void {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    this.roles.admin = decodedUser.role === 'admin';
    delete decodedUser.role;
  }
}
