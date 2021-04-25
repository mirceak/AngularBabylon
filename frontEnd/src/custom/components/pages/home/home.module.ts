import { NgModule } from '@angular/core';

import { HomeRoutingModule } from '@custom/components/pages/home/home-routing.module';
import { PageFormlyModule } from '../shared/base/page-simple-formly/page-simple-formly.module';

import { routerComponentDeclarations } from './home-routing.module';

@NgModule({
  declarations: [...routerComponentDeclarations],
  imports: [PageFormlyModule, HomeRoutingModule],
  exports: [],
  providers: [],
})
export class HomeModule {}
