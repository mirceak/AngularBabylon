import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatContentService } from '@custom/components/pages/home/services/chat-content.service';
import { mountRootParcel } from 'single-spa';
import { loadRemoteModule } from '@angular-architects/module-federation';
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

  config;
  mountRootParcel;
  constructor(
    public chatContentService: ChatContentService,
    private ProviderMailBox: ProviderMailBox,
    public ProviderIdentity: ProviderIdentity,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.ProviderMailBox.mailBoxObservable.next(
      this.ProviderMailBox.mailBoxes.value.filter((current) => {
        return current._id == this.route.snapshot.params._id;
      })[0]
    );
    this.config = loadRemoteModule({
      remoteEntry: 'https://talky.ro/chat/remoteEntry.js',
      remoteName: 'chat',
      exposedModule: './AppModule',
    }).then((m) => {
      return m;
    });
    this.mountRootParcel = (config, props) => {
      props.mailBoxObservable = this.ProviderMailBox.mailBoxObservable;
      var parcel = mountRootParcel(config, props);
      return parcel;
    };
  }

  mailBoxSorter(a, b) {
    return a.timeStamp < b.timeStamp;
  }

  async send(): Promise<any> {
    this.ProviderIdentity.serviceSocket.serviceApi.serviceModals.showLoading({
      title: this.translate.instant('components.swal.loading'),
      html: this.translate.instant('pages.chat.sending'),
    });
    await this.ProviderMailBox.sendMessage(
      this.form.value,
      this.ProviderMailBox.mailBoxObservable.value
    ).then(() => {
      this.ProviderIdentity.serviceSocket.serviceApi.serviceModals.showToast({
        status: 'success',
        statusMessage: this.ProviderIdentity.serviceSocket.serviceApi.translate.instant(
          'components.toastr.success'
        ),
        title: this.ProviderIdentity.serviceSocket.serviceApi.translate.instant('pages.chat.sent'),
      });
    })
    .catch((error) => {
      //handled as toast in services/utils/service.http.ts
    });;
  }
}
