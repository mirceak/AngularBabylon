import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@custom/components/pages/login/login.component';
import { GuestGuardService } from '@custom/services/auth/guards/guest.guard.service';
import { AuthIdentityGuardService } from '@custom/services/auth/guards/auth-identity.guard.service';
import { LoginContentComponent } from './login-content/login-content.component';
import { LoginIdentityContentComponent } from './login-identity-content/login-identity-content.component';
import { RegisterContentComponent } from './register-content/register-content.component';
import { Route } from '@angular/compiler/src/core';

export const routerComponentDeclarations = [
  LoginComponent,
  LoginContentComponent,
  RegisterContentComponent,
  LoginIdentityContentComponent,
];

const routes: Routes = [
  {
    path: '',
    canActivate: [GuestGuardService],
    component: LoginComponent,
    children: [
      {
        path: 'login-identity',
        component: LoginIdentityContentComponent,
      },
      {
        path: 'login',
        component: LoginContentComponent,
        canActivate: [AuthIdentityGuardService],
      },
      {
        path: 'register',
        canActivate: [AuthIdentityGuardService],
        component: RegisterContentComponent,
      },
    ],
  },
];

const checkRouterComponentDeclarations = (currentRoutes: any): void => {
  currentRoutes.reduce(
    (allLoaded: boolean, current: any, index: number, array: Array<Route>) => {
      if (
        allLoaded &&
        current.component &&
        routerComponentDeclarations.indexOf(current.component) === -1
      ) {
        allLoaded = false;
        throw new Error(
          `Please make sure you add all components from your routes to the routerComponentDeclarations array! Missing component: ${current.component.name}`
        );
      }

      if (current.children) {
        checkRouterComponentDeclarations(current.children);
      }
      return allLoaded;
    },
    true
  );
};
checkRouterComponentDeclarations(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
