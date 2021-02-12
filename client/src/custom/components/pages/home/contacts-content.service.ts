import { Injectable } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsContentService {
  constructor(private pageFormlyService: PageFormlyService) {}
  fields = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: "Contact's Name",
        placeholder: 'Enter name',
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
        label: "Contact's Name",
        placeholder: 'Enter name',
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
        label: "Secret 1",
        placeholder: 'Enter secret',
        required: true,
      },
      validators: {
        required: this.pageFormlyService.requiredValidator,
      },
    },
    {
      key: 'secret2',
      type: 'input',
      templateOptions: {
        label: "Secret 2",
        placeholder: 'Enter secret',
        required: true,
      },
      validators: {
        required: this.pageFormlyService.requiredValidator,
      },
    },
  ];
}
