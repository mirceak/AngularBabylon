import { Injectable } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';

@Injectable({
  providedIn: 'root',
})
export class MailBoxContentService {
  constructor(private pageFormlyService: PageFormlyService) {}
  fields = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.name.label',
        _placeholder: 'formlyFields.name.placeholder',
        required: true,
      },
      validators: {
        required: this.pageFormlyService.requiredValidator,
      },
    },
  ];
  acceptFields = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.name.label',
        _placeholder: 'formlyFields.name.placeholder',
        required: true,
      },
      validators: {
        required: this.pageFormlyService.requiredValidator,
      },
    },
    {
      key: 'secret1',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.secret1.label',
        _placeholder: 'formlyFields.secret1.placeholder',
        required: true,
      },
      validators: {
        required: this.pageFormlyService.requiredValidator,
        minLength: {
          options: {
            min: 20,
          },
          expression: this.pageFormlyService.minLengthValidator(20),
        }
      },
    },
    {
      key: 'secret2',
      type: 'input',
      templateOptions: {
        translate: true,
        _label: 'formlyFields.secret2.label',
        _placeholder: 'formlyFields.secret2.placeholder',
        required: true,
      },
      validators: {
        required: this.pageFormlyService.requiredValidator,
        minLength: {
          options: {
            min: 20,
          },
          expression: this.pageFormlyService.minLengthValidator(20),
        }
      },
    },
  ];
}
