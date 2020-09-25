import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PageFormlyService } from '../base/page-formly/page-formly.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private pageFormlyService: PageFormlyService) {}
  fields = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        placeholder: 'Enter username',
        required: true,
      },
      validators: {
        minLength: this.pageFormlyService.minLengthValidator(6),
        required: this.pageFormlyService.requiredValidator,
      },
    },
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
    {
      key: 'role',
      type: 'select',
      templateOptions: {
        label: 'Role',
        required: true,
      },
      hooks: {
        onInit: (field?: FormlyFieldConfig) => {
          field.templateOptions.options = [
            {
              value: null,
              label: 'Select',
            },
            {
              value: 'admin',
              label: 'Admin',
            },
            {
              value: 'user',
              label: 'User',
            },
          ];
        },
      },
      validators: {
        min: this.pageFormlyService.minValidator(1),
        required: this.pageFormlyService.requiredValidator,
      },
    },
  ];
}
