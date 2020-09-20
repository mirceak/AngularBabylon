import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageSimpleModule } from '@custom/pages/page-simple.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ContentComponent } from './content/content.component';
import { SimpleLayoutComponent } from '@custom/layouts/simple-layout/simple-layout.component';

@NgModule({
  declarations: [HomeComponent, ContentComponent, SimpleLayoutComponent],
  imports: [PageSimpleModule, CommonModule, HomeRoutingModule],
})
export class HomeModule {}
