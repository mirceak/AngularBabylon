import { NgModule } from '@angular/core';
import { BaseFormPageModule } from '@kernel/pages/base/base.form-page.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PageSimpleModule } from '@custom/components/pages/shared/base/page-simple/page-simple.module';
import { FormSimpleComponent } from '@custom/components/pages/shared/forms/form-simple/form-simple.component';

@NgModule({
  declarations: [ FormSimpleComponent],
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
    FormSimpleComponent,
  ],
})
export class PageFormlyModule {}
