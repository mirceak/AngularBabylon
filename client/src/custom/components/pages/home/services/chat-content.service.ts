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
        label: this.pageFormlyService.internationalization.display(["Message"]),
        placeholder: this.pageFormlyService.internationalization.display(['Enter message']),
      },
    },
  ];
}
