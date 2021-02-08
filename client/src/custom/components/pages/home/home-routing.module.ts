import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@custom/components/pages/home/home.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { ReferralContentComponent } from './referral-content/referral-content.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeContentComponent,
      },
      {
        path: 'referral',
        component: ReferralContentComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
