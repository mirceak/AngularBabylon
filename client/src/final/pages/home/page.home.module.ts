import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHomeRoutingModule } from '@final/pages/home/page.home-routing.module';
import { HomeModule } from '@custom/components/pages/home/home.module';

@NgModule({
  imports: [HomeModule, CommonModule, PageHomeRoutingModule],
})
export class PageHomeModule {}
