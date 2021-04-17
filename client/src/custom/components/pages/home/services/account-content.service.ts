import { Injectable } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';

@Injectable({
  providedIn: 'root',
})
export class AccountContentService {
  constructor(private pageFormlyService: PageFormlyService) {}
  fields = [
    {
      key: 'oldPassword',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.oldPassword.label',
        _placeholder: 'formlyFields.oldPassword.placeholder',
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
      key: 'oldPin',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.oldPin.label',
        _placeholder: 'formlyFields.oldPin.placeholder',
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
