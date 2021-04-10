import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceInternationalization {
  lang = 'en';

  constructor(private http: HttpClient, public translate: TranslateService) {
    
  }

  setLanguage($event) {
    this.lang = $event.value;
    $event.source.value = 'null';
    return this.translate.use(this.lang)
  }
}
