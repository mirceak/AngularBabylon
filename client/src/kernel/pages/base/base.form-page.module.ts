import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import {
  registerTranslateExtension,
  HttpLoaderFactory,
} from '../../extensions/extension.translate';

@NgModule({
  imports: [
    FormlyModule.forChild({ extras: { lazyRender: true } }),
    TranslateModule.forChild({
      isolate: false,
    }),
  ],
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: registerTranslateExtension,
      deps: [TranslateService, ServiceInternationalization],
    },
  ],
  exports: [TranslateModule, FormlyModule, FormlyMaterialModule, HttpClientModule],
})
export class BaseFormPageModule {}
