import { Injectable } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
  providedIn: 'root',
})
export class ReferralContentService {
  constructor(private pageFormlyService: PageFormlyService) {}
  fields = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Referal\'s Email',
        placeholder: 'Enter email',
        required: true,
      },
      validators: {
        email: this.pageFormlyService.emailValidator,
        required: this.pageFormlyService.requiredValidator,
      },
    },
  ];
}
