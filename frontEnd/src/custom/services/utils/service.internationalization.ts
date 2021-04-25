import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProviderIdentity } from '@custom/entities/identity/provider/provider.identity';

import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceInternationalization {
  lang = 'en';
  public setLang = new Subject<any>();

  constructor(
    private http: HttpClient,
    public translate: TranslateService,
    private providerIdentity: ProviderIdentity
  ) {
    this.lang = localStorage.getItem('lang') || this.lang;
    this.translate.use(this.lang);

    this.providerIdentity.serviceSocket.serviceApi.loggedIn.subscribe((val) => {
      if (val) {
        if (this.lang !== providerIdentity.state.language) {
          this.setLanguage(providerIdentity.state.language)
            .toPromise()
            .then(() => {
              this.setLang.next(null);
            });
          return;
        }
        this.setLang.next(null);
      }
    });
  }

  setLanguage(value: any): any {
    this.lang = value;
    localStorage.setItem('lang', this.lang);
    this.providerIdentity.state.language = this.lang;
    return this.translate.use(this.lang);
  }
}
