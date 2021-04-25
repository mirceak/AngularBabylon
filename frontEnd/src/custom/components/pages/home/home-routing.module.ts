import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@custom/components/pages/home/home.component';
import { MailBoxContentComponent } from './mailBox-content/mailBox-content.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { ReferralContentComponent } from './referral-content/referral-content.component';
import { AccountContentComponent } from './account-content/account-content.component';
import { AuthGuardService } from '@custom/services/auth/guards/auth.guard.service';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { Route } from '@angular/compiler/src/core';

export const routerComponentDeclarations = [
  HomeComponent,
  HomeContentComponent,
  ReferralContentComponent,
  MailBoxContentComponent,
  ChatContentComponent,
  AccountContentComponent,
];

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
        path: 'account',
        component: AccountContentComponent,
      },
      {
        path: 'mailBoxes',
        children: [
          {
            path: '',
            component: MailBoxContentComponent,
          },
          {
            path: 'chat/:_id',
            component: ChatContentComponent,
          },
        ],
      },
    ],
  },
];

const checkRouterComponentDeclarations = (currentRoutes: any): void => {
  currentRoutes.reduce(
    (total: boolean, current: any, index: number, array: Array<Route>) => {
      if (
        current.component &&
        routerComponentDeclarations.indexOf(current.component) === -1
      ) {
        throw new Error(
          'Please make sure you add all components from your routes to the routerComponentDeclarations array! Missing component:' +
            current.component.name
        );
      }

      if (current.children) {
        checkRouterComponentDeclarations(current.children);
      }
      return total;
    },
    true
  );
};
checkRouterComponentDeclarations(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
