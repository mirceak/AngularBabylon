import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/src/sweetalert2';
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
export class GuestGuardService implements CanActivate {
  constructor(
    private router: Router,
    private serviceAuth: ServiceAuth,
    public translate: TranslateService,
    private serviceModals: ServiceModals
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.serviceAuth.loggedIn) {
      this.router.navigate(['/']);
      this.serviceModals.showToast({
        icon: 'error',
        title: this.translate.instant('services.guards.guest.message'),
      });
      return false;
    }
    return true;
  }
}
