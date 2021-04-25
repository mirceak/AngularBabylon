import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PageFormlyService {
  requiredValidator = (c: any) => Validators.required(c) == null;
  emailValidator = (c: any) => Validators.email(c) == null;
  minLengthValidator = (count: any) => {
    return (c: any) => Validators.minLength(count)(c) == null;
  }
  constructor() {}
}
