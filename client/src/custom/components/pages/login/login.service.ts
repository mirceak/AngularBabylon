import { Injectable } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-formly/page-formly.service';

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
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Password',
        required: true,
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(6),
        required: this.pageFormlyService.requiredValidator,
      },
    },
  ];
}
