import { NgModule } from '@angular/core';

import { PageFormlyModule } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.module';
import { LoginComponent } from '@custom/components/pages/login/login.component';
import { LoginRoutingModule } from '@custom/components/pages/login/login-routing.module';
import { LoginContentComponent } from '@custom/components/pages/login/login-content/login-content.component';
import { RegisterContentComponent } from '@custom/components/pages/login/register-content/register-content.component';
import { LoginIdentityContentComponent } from './login-identity-content/login-identity-content.component';

@NgModule({
  declarations: [LoginComponent, LoginContentComponent, RegisterContentComponent, LoginIdentityContentComponent],
  imports: [PageFormlyModule, LoginRoutingModule],
  exports: [],
})
export class LoginModule {}
