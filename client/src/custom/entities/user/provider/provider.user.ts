import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUser } from '@custom/entities/user/service/service.user';
import { ServiceSocket } from '@custom/services/utils/service.socket';
import { ModelUser } from '@custom/entities/user/model/model.user';

@Injectable({
  providedIn: 'root',
})
export class ProviderUser extends ServiceUser {
  currentUser: ModelUser = null;

  constructor(http: HttpClient, private serviceSocket: ServiceSocket) {
    super(http);
    this.serviceSocket.serviceApi.token.subscribe(
      this.setCurrentUser.bind(this)
    );
  }

  setCurrentUser(decodedToken): void {
    if (decodedToken) {
      this.currentUser = new ModelUser();
      this.serviceSocket.connectSocket();
    } else {
      this.currentUser = null;
    }
  }
}
