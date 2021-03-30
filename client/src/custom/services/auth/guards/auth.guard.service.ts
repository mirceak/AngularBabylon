import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
import { ServiceAuth } from '../service.auth';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private serviceAuth: ServiceAuth,
    public internationalization: ServiceInternationalization
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.serviceAuth.loggedIn) {      
      this.router.navigate(['/auth/login']);
      this._snackBar.open(this.internationalization.display(['Must Be Logged In!']), this.internationalization.display(['Close']), {
        duration: 2000,
      });
      return false;
    }
    return true;
  }
}
