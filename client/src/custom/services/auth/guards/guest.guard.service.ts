import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private _snackBar: MatSnackBar,
    private router: Router,
    private serviceAuth: ServiceAuth,
    public translate: TranslateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.serviceAuth.loggedIn) {
      this.router.navigate(['/']);
      this._snackBar.open(
        this.translate.instant('services.guards.guest.message'),
        this.translate.instant('services.guards.guest.close'),
        {
          duration: 2000,
        }
      );
      return false;
    }
    return true;
  }
}
