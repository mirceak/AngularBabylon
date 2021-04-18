import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceApi } from './service.api';

@Injectable({
  providedIn: 'root',
})
export class ServiceHttp implements HttpInterceptor {
  constructor(public serviceApi: ServiceApi) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(
        (res): Observable<HttpEvent<any>> => {          
          this.serviceApi.serviceModals.hideLoading();
          this.serviceApi.serviceModals.showToast({
            status: 'error',
            statusMessage: this.serviceApi.translate.instant(
              'components.toastr.error'
            ),
            title: this.serviceApi.translate.instant(res.error?.message || 'services.error'),
          });

          if (res.error?.message === 'services.auth.badJwt' && res.status === 403){
            location.reload();
          }

          return of(res);
        }
      )
    );
  }
}
