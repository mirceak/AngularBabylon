import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModelUser } from '@custom/entities/user/model/model.user';
import { ServiceUser } from '@custom/entities/user/service/service.user';
import { ServiceTunnel } from '@custom/services/tunnel/service.tunnel';

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
    private serviceTunnel: ServiceTunnel,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
    this.login({
      email: 'mircea.bereveanu@gmail.com',
      username: 'mircea',
      password: 'qweqwe'
    })
  }

  login(postData): void {
    // this.serviceTunnel.connect(postData)
    this.serviceTunnel.tunnel(postData);
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
