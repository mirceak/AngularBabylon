import { NgModule } from '@angular/core';

import { PageFormlyModule } from '@custom/components/pages/base/page-formly/page-formly.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginContentComponent } from './login-content/login-content.component';

@NgModule({
  declarations: [LoginComponent, LoginContentComponent],
  imports: [PageFormlyModule, LoginRoutingModule],
  exports: [],
})
export class LoginModule {}
