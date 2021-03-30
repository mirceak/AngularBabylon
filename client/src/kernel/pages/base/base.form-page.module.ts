import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { registerTranslateExtension } from '@custom/services/utils/service.translate';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {
  TranslateModule, TranslateService,
} from '@ngx-translate/core';

@NgModule({
  imports: [
    FormlyModule.forChild({ extras: { lazyRender: true } }),
    TranslateModule.forChild({
      isolate: false,
    })    
  ],
  providers: [
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslateService] },
  ],
  exports: [TranslateModule, FormlyModule, FormlyMaterialModule, HttpClientModule],
})
export class BaseFormPageModule {}
