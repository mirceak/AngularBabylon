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
        var hmac = CryptoJs.algo.HMAC.create(CryptoJs.algo.SHA512, p2);
        hmac.update(p1);
        var p1hash = tunnel.lockMessage(
          CryptoJs.enc.Base64.stringify(
            CryptoJs.enc.Hex.parse(hmac.finalize().toString())
          ),
          data.lock
        );
        hmac = CryptoJs.algo.HMAC.create(CryptoJs.algo.SHA512, p3);
        hmac.update(p2);
        var p2hash = tunnel.lockMessage(
          CryptoJs.enc.Base64.stringify(
            CryptoJs.enc.Hex.parse(hmac.finalize().toString())
          ),
          data.lock
        );
        hmac = CryptoJs.algo.HMAC.create(CryptoJs.algo.SHA512, p1);
        hmac.update(p3);
        var p3hash = tunnel.lockMessage(
          CryptoJs.enc.Base64.stringify(
            CryptoJs.enc.Hex.parse(hmac.finalize().toString())
          ),
          data.lock
        );
        var result = '';
        for (var i = 0; i < data.lock.length; i++) {
          var originalInputIdex = data.original.indexOf(
            p1hash[i % p1hash.length]
          );
          result += data.lock[i][originalInputIdex];
        }
        var tempLock = result.substring(
          result.indexOf(p2hash) + p2hash.length,
          result.indexOf(p3hash)
        );
        var serverLock = [];
        for (i = 0; i < tempLock.length / tunnel.originalMap.length; i++) {
          serverLock.push([
            ...tempLock.substring(i * (tunnel.originalMap.length-1), (tunnel.originalMap.length-1) * (i + 1)),
          ]);
        }
        var clientLock = tunnel
          .scrambledMapLength(tunnel.originalMap.length)
        
        var tunnelLock = tunnel.lockMessage(clientLock.join(''), serverLock)
        console.log(tunnelLock)
      },
      (error) => console.log(222, error),
      () => console.log('done')
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
