import { Injectable } from '@angular/core';
import { ServiceModals } from '@custom/services/plugins/service.modals';
import { Router, CanActivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceAuth } from '../service.auth';

@Injectable({ providedIn: 'root' })
export class GuardAuthIdentity implements CanActivate {
  constructor(
    public router: Router,
    public serviceAuth: ServiceAuth,
    public translate: TranslateService,
    public serviceModals: ServiceModals
  ) {}

  async canActivate(): Promise<boolean> {
    if (this.serviceAuth.serviceApi.sessionToken.value) {
      this.serviceModals.showToast({
        status: 'error',
        statusMessage: this.translate.instant('components.toastr.error'),
        title: this.translate.instant('services.guards.auth-identity.message'),
      });
      this.router.navigate(['/auth/login-identity']);
      return false;
    }
    return true;
  }
}
