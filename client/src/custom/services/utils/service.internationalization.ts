import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProviderIdentity } from '@custom/entities/identity/provider/provider.identity';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceInternationalization {
  lang = 'en';

  constructor(
    private http: HttpClient,
    public translate: TranslateService,
    private ProviderIdentity: ProviderIdentity
  ) {
    this.lang = localStorage.getItem('lang') || this.lang;
    this.translate.use(this.lang);

    this.ProviderIdentity.serviceSocket.serviceApi.loggedIn.subscribe((val) => {
      if (val) {
        if (this.lang !== ProviderIdentity.state.language) {
          this.setLanguage(ProviderIdentity.state.language);
        }
      }
    });
  }

  setLanguage(value) {
    this.lang = value;
    localStorage.setItem('lang', this.lang);
    this.ProviderIdentity.state.language = this.lang;
    return this.translate.use(this.lang);
  }
}
