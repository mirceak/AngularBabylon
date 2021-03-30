import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

export class ServiceTranslate {
  constructor(private translate: TranslateService) {}
  prePopulate(field: FormlyFieldConfig) {
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

export function registerTranslateExtension(translate: TranslateService) {
  return {
    validationMessages: [
      {
        name: 'required',
        message(error, model) {
          return translate.stream('formlyValidation.required', {
            get label() {
              return translate.instant(model.templateOptions._label);
            },
          });
        },
      },
      {
        name: 'email',
        message(error, model) {
          return translate.stream('formlyValidation.email', {
            get label() {
              return translate.instant(model.templateOptions._label);
            },
          });
        },
      },
      {
        name: 'minLength',
        message(error, model) {
          return translate.stream('formlyValidation.minLen', {
            get label() {
              return translate.instant(model.templateOptions._label);
            },

            get count() {
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
