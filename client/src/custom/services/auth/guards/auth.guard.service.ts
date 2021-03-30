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
export class AuthGuardService implements CanActivate {
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
    if (!this.serviceAuth.loggedIn) {
      this.router.navigate(['/auth/login']);
      this._snackBar.open(
        this.translate.instant('services.guards.auth.message'),
        this.translate.instant('services.guards.auth.close'),
        {
          duration: 2000,
        }
      );
      return false;
    }
    return true;
  }
}
