import { NgModule } from '@angular/core';
import { BaseFormPageModule } from '@kernel/pages/base/base.form-page.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageSimpleModule } from '@custom/components/pages/shared/base/page-simple/page-simple.module';
import { PageFormSimpleComponent } from '@custom/components/pages/shared/base/page-simple-formly/page-form-simple.component';
import { ServiceApi } from '@custom/services/utils/service.api';

@NgModule({
  declarations: [PageFormSimpleComponent],
  imports: [
    PageSimpleModule,
    ReactiveFormsModule,
    BaseFormPageModule,
  ],
  exports: [
    ReactiveFormsModule,
    PageSimpleModule,
    PageFormSimpleComponent,
  ],
  providers: [
    ServiceApi
  ]
})
export class PageFormlyModule {}
