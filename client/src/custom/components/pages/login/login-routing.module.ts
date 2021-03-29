import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@custom/components/pages/login/login.component';
import { GuestGuardService } from '@custom/services/auth/guards/guest.guard.service';
import { LoginContentComponent } from './login-content/login-content.component';
import { RegisterContentComponent } from './register-content/register-content.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [GuestGuardService],
    children: [
      {
        path: 'login',
        component: LoginContentComponent,
      },
      {
        path: 'register',
        component: RegisterContentComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
