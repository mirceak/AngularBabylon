import { NgModule } from '@angular/core';

import { RegisterComponent } from '@custom/components/pages/register/register.component';
import { RegisterContentComponent } from '@custom/components/pages/register/register-content/register-content.component';
import { RegisterRoutingModule } from '@custom/components/pages/register/register-routing.module';
import { PageFormlyModule } from '@custom/components/pages/shared/base/page-formly/page-formly.module';

@NgModule({
  declarations: [RegisterComponent, RegisterContentComponent],
  imports: [PageFormlyModule, RegisterRoutingModule],
  exports: [],
})
export class RegisterModule {}
