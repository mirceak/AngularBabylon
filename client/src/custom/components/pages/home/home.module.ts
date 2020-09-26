import { NgModule } from '@angular/core';

import { PageSimpleModule } from '@custom/components/pages/base/page-simple/page-simple.module';
import { HomeComponent } from '@custom/components/pages/home/home.component';
import { HomeRoutingModule } from '@custom/components/pages/home/home-routing.module';
import { HomeContentComponent } from '@custom/components/pages/home/home-content/home-content.component';

@NgModule({
  declarations: [HomeComponent, HomeContentComponent],
  imports: [PageSimpleModule, HomeRoutingModule],
  exports: [PageSimpleModule]
})
export class HomeModule {}
