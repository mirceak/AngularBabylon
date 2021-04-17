import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private pageFormlyService: PageFormlyService,
    private translate: TranslateService
  ) {}
  fields = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.email.label',
        _placeholder: 'formlyFields.email.placeholder',
        required: true,
      },
      validators: {
        minLength: {
          options: {
            min: 6,
          },
          expression: this.pageFormlyService.minLengthValidator(6),
        },
        email: this.pageFormlyService.emailValidator,
        required: this.pageFormlyService.requiredValidator,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.password.label',
        _placeholder: 'formlyFields.password.placeholder',
        required: true,
        type: 'password',
      },
      validators: {
        minLength: {
          options: {
            min: 6,
          },
          expression: this.pageFormlyService.minLengthValidator(6),
        },
        required: this.pageFormlyService.requiredValidator,
      },
    },
    {
      key: 'pin',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.pin.label',
        _placeholder: 'formlyFields.pin.placeholder',
        type: 'password',
        required: true,
      },
      validators: {
        minLength: {
          options: {
            min: 4,
          },
          expression: this.pageFormlyService.minLengthValidator(4),
        },
        required: this.pageFormlyService.requiredValidator,
      },
    },
    {
      key: 'referralCode',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.referralCode.label',
        _placeholder: 'formlyFields.referralCode.placeholder',
        required: true,
        type: 'password',
      },
      validators: {
        minLength: {
          options: {
            min: 20,
          },
          expression: this.pageFormlyService.minLengthValidator(20),
        },
        required: this.pageFormlyService.requiredValidator,
      },
    },
  ];
}
