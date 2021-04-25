import { NgModule } from '@angular/core';
import { BaseFormPageModule } from '@kernel/pages/base/base.form-page.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PageSimpleModule } from '@custom/components/pages/shared/base/page-simple/page-simple.module';
import { PageFormSimpleComponent } from '@custom/components/pages/shared/base/page-simple-formly/page-form-simple.component';
import { ServiceHttp } from '@custom/services/utils/service.http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    { provide: HTTP_INTERCEPTORS, useClass: ServiceHttp, multi: true },
  ]
})
export class PageFormlyModule {}
