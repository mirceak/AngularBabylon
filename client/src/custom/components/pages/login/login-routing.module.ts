import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@custom/components/pages/login/login.component';
import { GuestGuardService } from '@custom/services/auth/guards/guest.guard.service';
import { AuthIdentityGuardService } from '@custom/services/auth/guards/auth-identity.guard.service';
import { LoginContentComponent } from './login-content/login-content.component';
import { LoginIdentityContentComponent } from './login-identity-content/login-identity-content.component';
import { RegisterContentComponent } from './register-content/register-content.component';

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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
