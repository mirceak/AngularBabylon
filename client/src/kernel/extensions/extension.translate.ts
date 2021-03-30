import { HttpClient } from '@angular/common/http';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class ExtensionTranslate {
  constructor(private translate: TranslateService) {}
  prePopulate(field: FormlyFieldConfig) {
    const to = field.templateOptions || {};
    if (!to.translate || to._translated) {
      return;
    }

    to._translated = true;
    field.expressionProperties = {
      ...(field.expressionProperties || {}),
      'templateOptions.label': this.translate.stream(to.label),
    };
  }
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'cliesadnt/assedfsts/i18n/', '.json');
}

export function registerTranslateExtension(
  translate: TranslateService,
  internationalization: ServiceInternationalization
) {
  return {
    validationMessages: [
      {
        name: 'required',
        message() {
            console.log(translate
              .instant('form.name'));
              console.log(translate
                .instant('FORM.NAME'));
          return translate.instant('form.validation.required');
        },
      },
    ],
    extensions: [
      {
        name: 'translate',
        extension: new ExtensionTranslate(translate),
      },
    ],
  };
}
