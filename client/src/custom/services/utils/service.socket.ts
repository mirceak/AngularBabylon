import { HostListener, Injectable, NgZone } from '@angular/core';
import _Cryptography from '../../../cryptography';
import * as socketIO from 'socket.io-client';

import { ServiceApi } from './service.api';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';

@Injectable({
  providedIn: 'root',
})
export class ServiceSocket {
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
    this.socket.on('expiredToken', (error) => {
      this.serviceApi.serviceModals.showToast({
        status: 'error',
        statusMessage: this.serviceApi.translate.instant(
          'components.toastr.error'
        ),
        title: this.serviceApi.translate.instant(error.message),
      });
      location.reload();
    });
    this.socket.on('error', (error) => {
      this.serviceApi.serviceModals.showToast({
        status: 'error',
        statusMessage: this.serviceApi.translate.instant(
          'components.toastr.error'
        ),
        title: this.serviceApi.translate.instant(error.message),
      });
      location.reload();
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
      var decryptedData: any = await this.serviceApi.decryptServerData(
        data,
        message.rsa
      );
      var mailBoxIndex;
      if (decryptedData.decryptedToken.data.mailBox) {
        mailBoxIndex = this.ProviderMailBox.mailBoxes.value.findIndex(
          (mailBox) => {
            return mailBox._id == decryptedData.decryptedToken.data.mailBox._id;
          }
        );
        if (mailBoxIndex === -1) {
          return;
        }
        var mailBox = this.ProviderMailBox.mailBoxes.value[mailBoxIndex];
        this.ProviderMailBox.updateMailBox(
          mailBox,
          decryptedData.decryptedToken.data.mailBox
        );
      } else if (decryptedData.decryptedToken.data.mailBoxes) {
        decryptedData.decryptedToken.data.mailBoxes.forEach((mailBox) => {
          var localMailbox = this.ProviderMailBox.mailBoxes.value[
            this.ProviderMailBox.mailBoxes.value.findIndex((_mailBox) => {
              return _mailBox._id == mailBox._id;
            })
          ];
          if (!localMailbox) {
            return;
          }
          this.ProviderMailBox.updateMailBox(localMailbox, mailBox);
        });
        return;
      }
    });
  }
}
