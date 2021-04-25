import { Injectable } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';

@Injectable({
  providedIn: 'root',
})
export class LoginIdentityService {
  constructor(
    private pageFormlyService: PageFormlyService,
    private serviceAuth: ServiceAuth
  ) {}
  fields = [
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
      hideExpression: () => {
        return (
          this.serviceAuth.serviceApi.sessionToken.value == null ||
          !this.serviceAuth.serviceApi.sessionToken.value.failedPin
        );
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
