import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageSimpleModule } from '@custom/pages/page-simple.module';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '@kernel/material/material.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    PageSimpleModule,
    CommonModule,
    HomeRoutingModule,
  ],
  exports: [MaterialModule],
})
export class HomeModule {}
