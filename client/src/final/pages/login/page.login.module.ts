import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLoginRoutingModule } from '@final/pages/login/page.login-routing.module';
import { LoginModule } from '@custom/components/pages/login/login.module';

@NgModule({
  imports: [LoginModule, CommonModule, PageLoginRoutingModule],
})
export class PageLoginModule {}
