import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  imports: [
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
  ],
  exports: [FormlyModule, FormlyMaterialModule, HttpClientModule],
})
export class BaseFormPageModule {}
