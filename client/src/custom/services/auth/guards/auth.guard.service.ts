import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { ServiceAuth } from '../service.auth';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private serviceAuth: ServiceAuth
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.serviceAuth.loggedIn) {      
      this.router.navigate(['/login']);
      this._snackBar.open('Must Be Logged In!', 'Close', {
        duration: 2000,
      });
      return false;
    }
    return true;
  }
}
