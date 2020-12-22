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

        var p1hashLocked = tunnel.lockMessage(
          this.getHash(p2, p1),
          data.dataLock
        );
        var p2hashLocked = tunnel.lockMessage(
          this.getHash(p3, p2),
          data.dataLock
        );
        var p3hashLocked = tunnel.lockMessage(
          this.getHash(p1, p3),
          data.dataLock
        );

        var lockedServerLockMessage = tunnel.unlock(data.lock, p1hashLocked);

        var p2hashLockedTwice = tunnel.lockMessage(p2hashLocked, data.dataLock);
        var p2hashIndex = lockedServerLockMessage.indexOf(p2hashLockedTwice);

        var unlockedServerLockMessage = tunnel
          .unlockMessage(
            lockedServerLockMessage.substring(p2hashIndex),
            data.dataLock
          )
          .substring(p2hashLockedTwice.length);

        var p3hashIndex = unlockedServerLockMessage.indexOf(p3hashLocked);
        var serverLockString = unlockedServerLockMessage.substring(
          0,
          p3hashIndex
        );

        var serverLock = tunnel.fromString(serverLockString);

        var clientLockLength =
          tunnel.originalMap.length + Math.random() * tunnel.randomThreshold;
        var finalLockLength =
          this.hashLen * 2 +
          clientLockLength * clientLockLength +
          Math.random() * tunnel.randomThreshold +
          tunnel.offsetThreshold;
        var dataLockLength =
          this.hashLen + Math.random() * tunnel.randomThreshold;

        var finalLock = tunnel.generateLock(finalLockLength);
        var dataLock = tunnel.generateLock(dataLockLength);
        var clientLock = tunnel.generateLock(clientLockLength);

        p2hashLocked = tunnel.lockMessage(this.getHash(p3, p2), dataLock);
        p3hashLocked = tunnel.lockMessage(this.getHash(p1, p3), dataLock);

        var lockedFinalLock = tunnel.lockMessage(
          p2hashLocked + tunnel.toString(clientLock) + p3hashLocked,
          serverLock
        );
        tunnel.engraveKey(finalLock, serverLockString, lockedFinalLock, true);
        var postData = {
          finalLock: tunnel.toString(finalLock),
          dataLock: tunnel.toString(dataLock),
        };
        this.virtualProcess.lock(postData).subscribe(
          (data) => {
            console.log(tunnel.unlockMessage(data.encrypted, clientLock));
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
