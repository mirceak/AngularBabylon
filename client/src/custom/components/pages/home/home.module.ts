import { NgModule } from '@angular/core';

import { HomeComponent } from '@custom/components/pages/home/home.component';
import { HomeRoutingModule } from '@custom/components/pages/home/home-routing.module';
import { HomeContentComponent } from '@custom/components/pages/home/home-content/home-content.component';
import { ReferralContentComponent } from './referral-content/referral-content.component';
import { PageFormlyModule } from '../shared/base/page-simple-formly/page-simple-formly.module';
import { MailBoxContentComponent } from './mailBox-content/mailBox-content.component';
import { ChatContentComponent } from './chat-content/chat-content.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeContentComponent,
    ReferralContentComponent,
    MailBoxContentComponent,
    ChatContentComponent,
  ],
  imports: [PageFormlyModule, HomeRoutingModule],
  exports: [],
  providers: [],
})
export class HomeModule {}
