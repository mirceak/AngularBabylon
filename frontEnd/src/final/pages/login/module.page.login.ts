import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModule } from '@custom/components/pages/login/login.module';

@NgModule({
  imports: [LoginModule, CommonModule],
})
export class ModulePageLogin {}
