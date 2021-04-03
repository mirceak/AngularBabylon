import { HostListener, Injectable, NgZone } from '@angular/core';
import _Cryptography from '../../../cryptography';
import * as socketIO from 'socket.io-client';

import { ServiceApi } from './service.api';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';

@Injectable({
  providedIn: 'root',
})
export class ServiceSocket {
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    event.preventDefault();
    this.socket.disconnect();
  }
  public socket;
  private messageQueue: any = [];
  lang = 'en';

  constructor(
    public serviceApi: ServiceApi,
    public ProviderMailBox: ProviderMailBox
  ) {}
  connectSocket() {
    this.socket = socketIO.io('https://talky.ro:5050', {
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', () => {
      this.socket.emit('identification', {
        sessionJwt: localStorage.getItem('token'),
      });
    });
    this.socket.on('verification', async (data) => {
      data.clientMsgId = Date.now().toString();
      var reqData = await this.serviceApi.getRequestData(
        data,
        this.serviceApi.token
      );
      this.messageQueue.push({ id: data.clientMsgId, rsa: reqData.nextRsa });
      this.socket.emit('verify', {
        sessionJwt: this.serviceApi.token.sessionJwt,
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
      } else if (decryptedData.decryptedToken.data.mailBoxes) {
        decryptedData.decryptedToken.data.mailBoxes.forEach((mailBox) => {
          var localMailbox = this.ProviderMailBox.mailBoxes[
            this.ProviderMailBox.mailBoxes.findIndex((_mailBox) => {
              return _mailBox._id == mailBox._id;
            })
          ];
          this.updateMailBox(localMailbox, mailBox);
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

      var mailBox = this.ProviderMailBox.mailBoxes[mailBoxIndex];
      this.updateMailBox(mailBox, decryptedData.decryptedToken.data.mailBox);
    });
  }

  async updateMailBox(mailBox, remoteMailBox) {
    if (mailBox.reactiveCallback) {
      mailBox.reactiveCallback();
    }
    mailBox.messages = remoteMailBox.messages || mailBox.messages;
    if (
      mailBox.remote == false &&
      mailBox.secret3 == null &&
      mailBox.messages.remote != null
    ) {
      this.serviceApi.serviceModals.showToast({
        status: 'success',
        statusMessage: this.serviceApi.translate.instant(
          'components.toastr.success'
        ),
        title: this.serviceApi.translate.instant(
          'pages.mailBox.acceptedRemote',
          {
            name: mailBox.name,
          }
        ),
      });
      var mailBoxKey = await this.serviceApi.Cryptography.importRsaKey(
        mailBox.privkData
      );
      var rsaDecryptedAesKey = await this.serviceApi.Cryptography.rsaDecrypt(
        await this.serviceApi.Cryptography.str2ab(mailBox.messages.remote[0]),
        mailBoxKey
      );
      var aesKey = await this.serviceApi.Cryptography.importAesKey(
        rsaDecryptedAesKey
      );
      var aesDecrypted = JSON.parse(
        await this.serviceApi.Cryptography.aesDecrypt(
          await this.serviceApi.Cryptography.str2ab(mailBox.messages.remote[1]),
          aesKey,
          mailBox.pubkData
        )
      );
      mailBox.aesPubkData = rsaDecryptedAesKey;
      mailBox.secret3 = aesDecrypted.secret;
      mailBox.nextRsa = aesDecrypted.nextRsa;
      mailBox.messages.remote.length = 0;

      this.ProviderMailBox.sendMessage({ messages: mailBox.messages }, mailBox);
    } else {
      this.serviceApi.zone.run(() => {
        Object.assign(this.ProviderMailBox.mailBoxes, {});
      });
      localStorage.setItem(
        'mailBoxes',
        JSON.stringify(this.ProviderMailBox.mailBoxes)
      );
    }
  }
}
