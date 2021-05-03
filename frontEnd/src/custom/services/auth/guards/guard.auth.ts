import { Injectable } from '@angular/core';
import { ServiceModals } from '@custom/services/utils/service.modals';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceAuth } from '../service.auth';

@Injectable({ providedIn: 'root' })
export class GuardAuth implements CanActivate {
  constructor(
    private router: Router,
    private serviceAuth: ServiceAuth,
    private translate: TranslateService,
    private serviceModals: ServiceModals
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (
      this.serviceAuth.serviceApi.sessionToken.value &&
      !this.serviceAuth.serviceApi.loggedIn.value
    ) {
      this.serviceModals.showToast({
        status: 'error',
        statusMessage: this.translate.instant('components.toastr.error'),
        title: this.translate.instant('services.guards.auth-identity.message'),
      });
      this.router.navigate(['/auth/login-identity']);
      return false;
    } else if (
      !this.serviceAuth.serviceApi.sessionToken.value &&
      !this.serviceAuth.serviceApi.loggedIn.value
    ) {
      this.router.navigate(['/auth/login']);
      this.serviceModals.showToast({
        status: 'error',
        statusMessage: this.translate.instant('components.toastr.error'),
        title: this.translate.instant('services.guards.auth.message'),
      });
      return false;
    }
    return true;
  }
}