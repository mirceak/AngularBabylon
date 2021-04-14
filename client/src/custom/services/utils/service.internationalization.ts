import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceInternationalization {
  lang = 'en';

  constructor(private http: HttpClient, public translate: TranslateService) {
    this.lang = localStorage.getItem('lang') || this.lang;
    this.setLanguage(this.lang);
  }

  setLanguage(value) {
    this.lang = value;
    localStorage.setItem('lang', this.lang);
    return this.translate.use(this.lang);
  }
}
