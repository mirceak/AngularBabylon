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
        label: 'Email',
        placeholder: 'Enter email',
        required: true,
      },
      validators: {
        email: this.pageFormlyService.emailValidator,
        required: this.pageFormlyService.requiredValidator,
      },
    },
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        required: true,
        type: 'password',
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(6),
        required: this.pageFormlyService.requiredValidator,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Password',
        required: true,
        type: 'password',
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(6),
        required: this.pageFormlyService.requiredValidator,
      },
    },
  ];
}
