import { Directive } from '@angular/core';
import { PageFormlyService } from './page-formly.service'

@Directive({
  selector: '[appPageFormly]',
  providers: [PageFormlyService],
})
export class PageFormlyDirective {

  constructor(pageFormlyService: PageFormlyService) {}
}
