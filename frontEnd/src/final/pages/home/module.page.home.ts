import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from '@custom/components/pages/home/home.module';

@NgModule({
  imports: [HomeModule, CommonModule],
})
export class ModulePageHome {}
