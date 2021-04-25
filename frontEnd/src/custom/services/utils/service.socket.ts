import { Injectable } from '@angular/core';
import _Cryptography from '../../../cryptography';
import * as socketIO from 'socket.io-client';

import { ServiceApi } from './service.api';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceSocket {
  public socket: any;
  private messageQueue: any = [];
  lang = 'en';
  public connected = new BehaviorSubject<boolean>(true);

  constructor(
    public serviceApi: ServiceApi,
    public providerMailBox: ProviderMailBox
  ) {}
  disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.connected.next(false);
    }
  }
  connectSocket(): void {
    this.socket = socketIO.io('https://talky.ro:5050', {
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', (): void => {
      this.socket.emit('identification', {
        sessionJwt: this.serviceApi.token.value.sessionJwt,
      });
    });
    this.socket.on('expiredToken', (error: any): void => {
      this.serviceApi.serviceModals.showToast({
        status: 'error',
        statusMessage: this.serviceApi.translate.instant(
          'components.toastr.error'
        ),
        title: this.serviceApi.translate.instant(error.message),
      });
      location.reload();
    });
    this.socket.on('error', (error: any): void => {
      this.serviceApi.serviceModals.showToast({
        status: 'error',
        statusMessage: this.serviceApi.translate.instant(
          'components.toastr.error'
        ),
        title: this.serviceApi.translate.instant(error.message),
      });
      location.reload();
    });
    this.socket.on('verification', async (data: any): Promise<any> => {
      data.clientMsgId = Date.now().toString();
      const reqData = await this.serviceApi.getRequestData(
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
    this.socket.on('updateMailBox', async (data: any): Promise<any> => {
      const messageIndex = this.messageQueue.findIndex((currentMessage: any): any => {
        return currentMessage.id === data.clientMsgId;
      });
      const message = this.messageQueue.splice(messageIndex, 1)[0];
      const decryptedData: any = await this.serviceApi.decryptServerData(
        data,
        message.rsa
      );
      let mailBoxIndex;
      if (decryptedData.decryptedToken.data.mailBox) {
        mailBoxIndex = this.providerMailBox.mailBoxes.value.findIndex(
          (currentMailBox: any): any => {
            return currentMailBox._id === decryptedData.decryptedToken.data.mailBox._id;
          }
        );
        if (mailBoxIndex === -1) {
          return;
        }
        const mailBox = this.providerMailBox.mailBoxes.value[mailBoxIndex];
        this.providerMailBox.updateMailBox(
          mailBox,
          decryptedData.decryptedToken.data.mailBox
        );
      } else if (decryptedData.decryptedToken.data.mailBoxes) {
        decryptedData.decryptedToken.data.mailBoxes.forEach((mailBox: any): any => {
          const localMailbox = this.providerMailBox.mailBoxes.value[
            this.providerMailBox.mailBoxes.value.findIndex((currentMailBox: any): any => {
              return currentMailBox._id === mailBox._id;
            })
          ];
          if (!localMailbox) {
            return;
          }
          this.providerMailBox.updateMailBox(localMailbox, mailBox);
        });
      }
      this.connected.next(true);
    });
  }
}
