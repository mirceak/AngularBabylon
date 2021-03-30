import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private pageFormlyService: PageFormlyService) {}
  fields = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: this.pageFormlyService.internationalization.display(["Email"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter email']),
        required: true,
        type: 'password',
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(6),
        email: this.pageFormlyService.emailValidator,
        required: this.pageFormlyService.requiredValidator,
      },
      expressionProperties: {
        'templateOptions.label':  ()=> this.pageFormlyService.internationalization.display(['Email']),
        'templateOptions.placeholder': () => this.pageFormlyService.internationalization.display(['Enter email']),
      },
    },
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: this.pageFormlyService.internationalization.display(["Username"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter username']),
        required: true,
        type: 'password',
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
        label: this.pageFormlyService.internationalization.display(["Password"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter password']),
        required: true,
        type: 'password',
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(6),
        required: this.pageFormlyService.requiredValidator,
      },
      expressionProperties: {
        'templateOptions.label': () => this.pageFormlyService.internationalization.display(['Password']),
        'templateOptions.placeholder': () => this.pageFormlyService.internationalization.display(['Enter password']),
      },
    },
    {
      key: 'referralCode',
      type: 'input',
      templateOptions: {
        label: this.pageFormlyService.internationalization.display(["Secret"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter secret']),
        required: true,
        type: 'password',
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(20),
        required: this.pageFormlyService.requiredValidator,
      },
      expressionProperties: {
        'templateOptions.label': () => this.pageFormlyService.internationalization.display(['Secret']),
        'templateOptions.placeholder': () => this.pageFormlyService.internationalization.display(['Enter secret']),
      },
    },
  ];
}
