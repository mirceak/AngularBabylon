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
        label: this.pageFormlyService.internationalization.display(["Email"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter email']),
        required: true,
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(6),
        email: this.pageFormlyService.emailValidator,
        required: this.pageFormlyService.requiredValidator,
      },
      expressionProperties: {
        'templateOptions.label': () => this.pageFormlyService.internationalization.display(["Email"]),
        'templateOptions.placeholder': () => this.pageFormlyService.internationalization.display(['Enter email']),
      },
    },
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: this.pageFormlyService.internationalization.display(["Username"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter username']),
        type: 'password',
        required: true,
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(6),
        required: this.pageFormlyService.requiredValidator,
      },
      expressionProperties: {
        'templateOptions.label': () => this.pageFormlyService.internationalization.display(['Username']),
        'templateOptions.placeholder': () => this.pageFormlyService.internationalization.display(['Enter username']),
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        translate: true,
        label: 'FORM.NAME',
        placeholder: this.pageFormlyService.internationalization.display(['Enter password']),
        type: 'password',
        required: true,
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(6),
        required: this.pageFormlyService.requiredValidator,
      },
      // expressionProperties: {
      //   'templateOptions.label': () => this.pageFormlyService.internationalization.display(['Password']),
      //   'templateOptions.placeholder': () => this.pageFormlyService.internationalization.display(['Enter password']),
      // },
    },
  ];
}
