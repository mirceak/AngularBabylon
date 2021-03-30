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
        label: this.pageFormlyService.internationalization.display(["MailBox's Name"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter name']),
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
        label: this.pageFormlyService.internationalization.display(["MailBox's Name"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter name']),
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
        label: this.pageFormlyService.internationalization.display(["Secret 1"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter secret']),
        required: true,
      },
      validators: {
        required: this.pageFormlyService.requiredValidator,
        minLength: this.pageFormlyService.minLengthValidator(20),
      },
    },
    {
      key: 'secret2',
      type: 'input',
      templateOptions: {
        label: this.pageFormlyService.internationalization.display(["Secret 2"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter secret']),
        required: true,
      },
      validators: {
        required: this.pageFormlyService.requiredValidator,
        minLength: this.pageFormlyService.minLengthValidator(20),
      },
    },
  ];
}
