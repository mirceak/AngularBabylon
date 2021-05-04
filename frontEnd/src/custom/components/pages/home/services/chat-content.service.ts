import { Injectable } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-simple-formly/page-simple-formly.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatContentService {
  inputFocused = new Subject<any>();
  constructor(private pageFormlyService: PageFormlyService) {}
  fields = [
    {
      key: 'message',
      type: 'input',
      templateOptions: {
        blur: () => {
          this.inputFocused.next(false);
        },
        focus: () => {
          this.inputFocused.next(true);
        },
        attributes: {
          autocomplete: 'off',
        },
        translate: true,
        _label: 'formlyFields.message.label',
        _placeholder: 'formlyFields.message.placeholder',
      },
    },
  ];
}
