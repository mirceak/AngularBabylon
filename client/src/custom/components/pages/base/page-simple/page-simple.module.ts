import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavListSimpleComponent } from '@custom/components/nav/nav-list-simple/nav-list-simple.component';
import { LayoutSimpleComponent } from '@custom/components/layouts/layout-simple/layout-simple.component';
import { BasePageModule } from '@kernel/pages/base/base.page.module';
import { PageSimpleComponent } from '@custom/components/pages/base/page-simple/page-simple.component';

@NgModule({
  declarations: [LayoutSimpleComponent, PageSimpleComponent, NavListSimpleComponent],
  imports: [RouterModule, BasePageModule],
  exports: [
    BasePageModule,
    LayoutSimpleComponent,
    PageSimpleComponent,
    NavListSimpleComponent,
  ],
})
export class PageSimpleModule {}
