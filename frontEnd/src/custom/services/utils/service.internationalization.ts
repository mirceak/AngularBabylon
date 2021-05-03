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
        if (
          this.lang !==
          providerIdentity.serviceSocket.serviceApi.state.language.value
        ) {
          this.setLanguage(
            providerIdentity.serviceSocket.serviceApi.state.language.value
          )
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
    if (this.providerIdentity.serviceSocket.serviceApi.loggedIn.value) {
      this.providerIdentity.serviceSocket.serviceApi.state.language.next(
        this.lang
      );
      this.providerIdentity.serviceSocket.serviceApi.encryptAndSaveState(
        this.providerIdentity.serviceSocket.serviceApi.crypto.password
      );
    }
    return this.translate.use(this.lang);
  }
}
