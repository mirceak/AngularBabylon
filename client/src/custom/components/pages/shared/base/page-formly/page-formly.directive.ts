import { Directive } from '@angular/core';
import { PageFormlyService } from '@custom/components/pages/shared/base/page-formly/page-formly.service'

@Directive({
  selector: '[appPageFormly]',
  providers: [PageFormlyService],
})
export class PageFormlyDirective {

  constructor(pageFormlyService: PageFormlyService) {}
}
