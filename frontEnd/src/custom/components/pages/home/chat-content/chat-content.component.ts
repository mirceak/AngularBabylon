import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatContentService } from '@custom/components/pages/home/services/chat-content.service';
import { TranslateService } from '@ngx-translate/core';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { ProviderIdentity } from '@custom/entities/identity/provider/provider.identity';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
  providers: [ChatContentService],
})
export class ChatContentComponent implements OnInit {
  @ViewChild('scroll') scroller!: ElementRef;

  form = new FormGroup({});

  public messages: any = [];

  constructor(
    public chatContentService: ChatContentService,
    private providerMailBox: ProviderMailBox,
    public providerIdentity: ProviderIdentity,
    private route: ActivatedRoute,
    private zone: NgZone,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.chatContentService.inputFocused.subscribe((focused) => {
      if (focused) {
        this.scrollToBottom();
        setTimeout(() => {
          this.scrollToBottom();
        }, 300);
      }
    });

    this.providerMailBox.mailBoxObservable.next(
      this.providerIdentity.serviceSocket.serviceApi.state.mailBoxes.value.filter(
        (current: any): any => {
          return current._id === this.route.snapshot.params._id;
        }
      )[0]
    );

    this.providerMailBox.mailBoxObservable.subscribe(async (mailBox: any) => {
      this.messages.splice(0);
      var concat = [...mailBox.messages.local, ...mailBox.messages.remote];
      concat = await Promise.all(concat.map(async (currentMessage: any) => {
        const key =
          await this.providerIdentity.serviceSocket.serviceApi.Cryptography.importAesKey(
            mailBox.aesPubkData
          );
        const message = JSON.parse(
          await this.providerIdentity.serviceSocket.serviceApi.Cryptography.aesDecrypt(
            this.providerIdentity.serviceSocket.serviceApi.Cryptography.str2ab(
              currentMessage.ciphertext
            ),
            key,
            mailBox.secret3
          )
        );
        message.remote = currentMessage.remote;
        return message;
      }))
      concat = concat.filter((currentMailBox: any) => {
        return currentMailBox.timeStamp != null;
      })
      concat = concat.sort((a: any, b: any) => {
        return a.timeStamp - b.timeStamp;
      })
      this.messages.push(...concat);
      this.zone.run(() => {
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      });
    });
  }

  scrollToBottom(): void {
    if (!this.scroller) {
      return;
    }
    this.scroller.nativeElement.scrollTop = Number.MAX_SAFE_INTEGER;
  }

  trackByFn(index: number, item: any): string {
    return item.timeStamp;
  }

  async send(): Promise<any> {
    this.providerIdentity.serviceSocket.serviceApi.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.chat.sending'),
    });
    await this.providerMailBox
      .sendMessage(
        this.form.value,
        this.providerMailBox.mailBoxObservable.value
      )
      .then(() => {
        this.providerIdentity.serviceSocket.serviceApi.serviceModals.showToast({
          status: 'success',
          statusMessage:
            this.providerIdentity.serviceSocket.serviceApi.translate.instant(
              'components.toastr.success'
            ),
          title:
            this.providerIdentity.serviceSocket.serviceApi.translate.instant(
              'pages.chat.sent'
            ),
        });
        this.providerIdentity.serviceSocket.serviceApi.serviceModals.hideLoading();
      })
      .catch((error) => {
        // handled as toast in services/utils/service.http.ts
      });
  }
}
