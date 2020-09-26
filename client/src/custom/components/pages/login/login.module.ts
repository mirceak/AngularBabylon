import { NgModule } from '@angular/core';

import { PageFormlyModule } from '@custom/components/pages/shared/base/page-formly/page-formly.module';
import { LoginComponent } from '@custom/components/pages/login/login.component';
import { LoginRoutingModule } from '@custom/components/pages/login/login-routing.module';
import { LoginContentComponent } from '@custom/components/pages/login/login-content/login-content.component';

@NgModule({
  declarations: [LoginComponent, LoginContentComponent],
  imports: [PageFormlyModule, LoginRoutingModule],
  exports: [],
})
export class LoginModule {}
