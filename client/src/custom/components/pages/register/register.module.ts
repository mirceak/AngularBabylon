import { NgModule } from '@angular/core';

import { RegisterComponent } from '@custom/components/pages/register/register.component';
import { RegisterContentComponent } from '@custom/components/pages/register/register-content/register-content.component';
import { RegisterRoutingModule } from './register-routing.module';
import { PageFormlyModule } from '../base/page-formly/page-formly.module';

@NgModule({
  declarations: [RegisterComponent, RegisterContentComponent],
  imports: [PageFormlyModule, RegisterRoutingModule],
  exports: [],
})
export class RegisterModule {}
