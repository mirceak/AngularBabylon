import { HostListener, Injectable, NgZone } from '@angular/core';
import _Cryptography from '../../../cryptography';
import * as socketIO from 'socket.io-client';

import { ServiceApi } from './service.api';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { ServiceAuth } from '../auth/service.auth';

@Injectable({
  providedIn: 'root',
})
export class ServiceSocket {
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    event.preventDefault();
    if (this.socket) this.socket.disconnect();
  }
  public socket;
  private messageQueue: any = [];
  lang = 'en';

  constructor(
    public serviceApi: ServiceApi,
    public ProviderMailBox: ProviderMailBox
  ) {}
  disconnectSocket() {
    if (this.socket) this.socket.disconnect();
  }
  connectSocket() {
    this.socket = socketIO.io('https://talky.ro:5050', {
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', () => {
      this.socket.emit('identification', {
        sessionJwt: this.serviceApi.token.value.sessionJwt,
      });
    });
    this.socket.on('error', (error) => {
      this.serviceApi.serviceModals.showToast({
        status: 'error',
        statusMessage: this.serviceApi.translate.instant(
          'components.toastr.error'
        ),
        title: this.serviceApi.translate.instant(error.message),
      });
      this.serviceApi.logout();
    });
    this.socket.on('verification', async (data) => {
      data.clientMsgId = Date.now().toString();
      var reqData = await this.serviceApi.getRequestData(
        data,
        this.serviceApi.token
      );
      this.messageQueue.push({ id: data.clientMsgId, rsa: reqData.nextRsa });
      this.socket.emit('verify', {
        sessionJwt: this.serviceApi.token.value.sessionJwt,
        rsaEncryptedAes: await this.serviceApi.Cryptography.ab2str(
          reqData.rsaEncryptedAes.encryptedAes
        ),
        aesEncrypted: await this.serviceApi.Cryptography.ab2str(
          reqData.aesEncrypted.ciphertext
        ),
      });
    });
    this.socket.on('updateMailBox', async (data) => {
      var messageIndex = this.messageQueue.findIndex((message) => {
        return message.id == data.clientMsgId;
      });
      var message = this.messageQueue.splice(messageIndex, 1)[0];
      var decryptedData = await this.serviceApi.decryptServerData(
        data,
        message.rsa
      );
      var mailBoxIndex;
      if (decryptedData.decryptedToken.data.mailBox) {
        mailBoxIndex = this.ProviderMailBox.mailBoxes.findIndex((mailBox) => {
          return mailBox._id == decryptedData.decryptedToken.data.mailBox._id;
        });
        var mailBox = this.ProviderMailBox.mailBoxes[mailBoxIndex];
        this.ProviderMailBox.updateMailBox(
          mailBox,
          decryptedData.decryptedToken.data.mailBox
        );
      } else if (decryptedData.decryptedToken.data.mailBoxes) {
        decryptedData.decryptedToken.data.mailBoxes.forEach((mailBox) => {
          var localMailbox = this.ProviderMailBox.mailBoxes[
            this.ProviderMailBox.mailBoxes.findIndex((_mailBox) => {
              return _mailBox._id == mailBox._id;
            })
          ];
          this.ProviderMailBox.updateMailBox(localMailbox, mailBox);
        });
        this.serviceApi.zone.run(() => {
          Object.assign(this.ProviderMailBox.mailBoxes, {});
        });
        localStorage.setItem(
          'mailBoxes',
          JSON.stringify(this.ProviderMailBox.mailBoxes)
        );
        return;
      }
    });
  }
}
