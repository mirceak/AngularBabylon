import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

export class ServiceTranslate {
  constructor(private translate: TranslateService) {}
  prePopulate(field: FormlyFieldConfig): any {
    const to = field.templateOptions || {};
    if (!to.translate || to._translated) {
      return;
    }

    to.label = this.translate.instant(to._label);
    to.placeholder = this.translate.instant(to._placeholder);

    to._translated = true;
    field.expressionProperties = {
      ...(field.expressionProperties || {}),
      'templateOptions.label': () => this.translate.instant(to._label),
      'templateOptions.placeholder': () =>
        this.translate.instant(to._placeholder),
    };
  }
}

export function registerTranslateExtension(translate: TranslateService): any {
  return {
    validationMessages: [
      {
        name: 'required',
        message(error: any, model: any): any {
          return translate.stream('formlyValidation.required', {
            get label(): any {
              return translate.instant(model.templateOptions._label);
            },
          });
        },
      },
      {
        name: 'email',
        message(error: any, model: any): any {
          return translate.stream('formlyValidation.email', {
            get label(): any {
              return translate.instant(model.templateOptions._label);
            },
          });
        },
      },
      {
        name: 'minLength',
        message(error: any, model: any): any {
          return translate.stream('formlyValidation.minLen', {
            get label(): any {
              return translate.instant(model.templateOptions._label);
            },

            get count(): any {
              return model.validators.minLength.options.min;
            },
          });
        },
      },
    ],
    extensions: [
      {
        name: 'translate',
        extension: new ServiceTranslate(translate),
      },
    ],
  };
}
