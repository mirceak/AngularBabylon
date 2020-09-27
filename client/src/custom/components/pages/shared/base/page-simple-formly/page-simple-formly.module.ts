import { NgModule } from '@angular/core';
import { BaseFormPageModule } from '@kernel/pages/base/base.form-page.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PageSimpleModule } from '@custom/components/pages/shared/base/page-simple/page-simple.module';
import { PageFormSimpleComponent } from '@custom/components/pages/shared/base/page-simple-formly/page-form-simple.component';

@NgModule({
  declarations: [PageFormSimpleComponent],
  imports: [
    PageSimpleModule,
    ReactiveFormsModule,
    BaseFormPageModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    PageSimpleModule,
    PageFormSimpleComponent,
  ],
})
export class PageFormlyModule {}
