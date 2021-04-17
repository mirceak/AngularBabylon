import { NgModule } from '@angular/core';

import { PageFormlyModule } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.module';
import { LoginRoutingModule } from '@custom/components/pages/login/login-routing.module';

import { routerComponentDeclarations } from './login-routing.module';

@NgModule({
  declarations: [...routerComponentDeclarations],
  imports: [PageFormlyModule, LoginRoutingModule],
  exports: [],
})
export class LoginModule {}
