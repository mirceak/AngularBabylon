import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatContentService } from '@custom/components/pages/home/services/chat-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { mountRootParcel } from 'single-spa';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { BehaviorSubject } from 'rxjs';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss'],
})
export class ChatContentComponent implements OnInit {
  form = new FormGroup({});
  mailBox = null;

  config;
  mountRootParcel;
  constructor(
    public chatContentService: ChatContentService,
    private serviceAuth: ServiceAuth,
    private route: ActivatedRoute,
    public internationalization: ServiceInternationalization
  ) {}

  ngOnInit(): void {
    this.mailBox = this.serviceAuth.mailBoxes.filter((current) => {
      return current._id == this.route.snapshot.params._id;
    })[0];
    this.config = loadRemoteModule({
      remoteEntry: 'https://talky.ro/chat/remoteEntry.js',
      remoteName: 'chat',
      exposedModule: './AppModule',
    }).then((m) => {
      return m;
    });
    this.mountRootParcel = (config, props) => {
      props.mailBox = this.mailBox;
      var parcel = mountRootParcel(config, props);
      return parcel;
    };
  }

  mailBoxSorter(a, b) {
    return a.timeStamp<b.timeStamp
  }

  async send(): Promise<any> {
    await this.serviceAuth.sendMessage(this.form.value, this.mailBox);
  }
}
