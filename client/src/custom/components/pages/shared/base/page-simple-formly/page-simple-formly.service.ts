import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PageFormlyService {
  requiredValidator = (c) => Validators.required(c) == null;
  emailValidator = (c) => Validators.email(c) == null;
  minLengthValidator = (count) => {
    return (c) => Validators.minLength(count)(c) == null;
  };
  constructor() {}
}
