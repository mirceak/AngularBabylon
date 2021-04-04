import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatContentService } from '@custom/components/pages/home/services/chat-content.service';
import { mountRootParcel } from 'single-spa';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { TranslateService } from '@ngx-translate/core';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';

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
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.ProviderMailBox.mailBoxObservable.next(
      this.ProviderMailBox.mailBoxes.filter((current) => {
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
    await this.ProviderMailBox.sendMessage(
      this.form.value,
      this.ProviderMailBox.mailBoxObservable.value
    );
  }
}
