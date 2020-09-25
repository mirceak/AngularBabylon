import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
  providedIn: 'root',
})
export class PageFormlyService {
  requiredValidator = {
    expression: (c) => Validators.required(c) == null,
    message: (error, field: FormlyFieldConfig) =>
      `"${field.templateOptions.label}" field is required`,
  };
  emailValidator = {
    expression: (c) => Validators.email(c) == null,
    message: (error, field: FormlyFieldConfig) =>
      `"${field.templateOptions.label}" needs to be a valid email`,
  };
  minLengthValidator = (count) => {
    return {
      expression: (c) => Validators.minLength(count)(c) == null,
      message: (error, field: FormlyFieldConfig) =>
        `"${field.templateOptions.label}" needs to be at least ${count} characters long`,
    };
  };
  minValidator = (value) => {
    return {
      expression: (c) => Validators.min(value)(c) == null,
      message: (error, field: FormlyFieldConfig) =>
        `"${field.templateOptions.label}" needs to be minimum ${value}`,
    };
  };
  constructor() {}
}
