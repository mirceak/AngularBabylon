import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@custom/components/pages/home/home.component';
import { MailBoxContentComponent } from './mailBox-content/mailBox-content.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { ReferralContentComponent } from './referral-content/referral-content.component';
import { AuthGuardService } from '@custom/services/auth/guards/auth.guard.service'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: HomeContentComponent,
      },
      {
        path: 'referral',
        component: ReferralContentComponent,
      },
      {
        path: 'mailBoxes',
        component: MailBoxContentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
