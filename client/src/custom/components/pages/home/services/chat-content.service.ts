import { Injectable } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';

@Injectable({
  providedIn: 'root'
})
export class ChatContentService {

  constructor(private pageFormlyService: PageFormlyService) {}
  fields = [
    {
      key: 'message',
      type: 'input',
      templateOptions: {
        label: "Message",
        placeholder: 'Type a message',
        required: true,
      },
      validators: {
        required: this.pageFormlyService.requiredValidator,
      },
    },
  ];
}
