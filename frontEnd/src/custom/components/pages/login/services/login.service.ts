import { Injectable } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private pageFormlyService: PageFormlyService) {}
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
        type: 'password',
        required: true,
      },
      validators: {
        minLength: {
          options: {
            min: 6,
          },
          expression: this.pageFormlyService.minLengthValidator(6),
        },
        required: {
          expression: this.pageFormlyService.requiredValidator,
        },
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
  ];
}
