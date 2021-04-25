import { Component, OnInit } from '@angular/core';
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
  form = new FormGroup({});

  constructor(
    public chatContentService: ChatContentService,
    private providerMailBox: ProviderMailBox,
    public providerIdentity: ProviderIdentity,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.providerMailBox.mailBoxObservable.next(
      this.providerMailBox.mailBoxes.value.filter((current: any): any => {
        return current._id === this.route.snapshot.params._id;
      })[0]
    );
  }

  mailBoxSorter(a: any, b: any): any {
    return a.timeStamp < b.timeStamp;
  }

  async send(): Promise<any> {
    this.providerIdentity.serviceSocket.serviceApi.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.chat.sending'),
    });
    await this.providerMailBox.sendMessage(
      this.form.value,
      this.providerMailBox.mailBoxObservable.value
    ).then(() => {
      this.providerIdentity.serviceSocket.serviceApi.serviceModals.showToast({
        status: 'success',
        statusMessage: this.providerIdentity.serviceSocket.serviceApi.translate.instant(
          'components.toastr.success'
        ),
        title: this.providerIdentity.serviceSocket.serviceApi.translate.instant('pages.chat.sent'),
      });
    })
    .catch((error) => {
      // handled as toast in services/utils/service.http.ts
    });
  }
}