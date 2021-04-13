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
export class AuthIdentityGuardService implements CanActivate {
  constructor(
    private router: Router,
    private serviceAuth: ServiceAuth,
    private translate: TranslateService,
    private serviceModals: ServiceModals
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
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
