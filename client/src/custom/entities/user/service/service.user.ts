import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ServiceEntityBase } from '@custom/entities/base/service.entity.base';
import { ModelUser } from '@custom/entities/user/model/model.user';

@Injectable({
  providedIn: 'root',
})
export class ServiceUser extends ServiceEntityBase<ModelUser> {
  constructor(http: HttpClient) {
    super(http, {
      pathNamePlural: 'users',
      pathName: 'user',
    });
  }

  register(user: ModelUser): Observable<ModelUser> {
    return this.http.post<ModelUser>('/api/user', user);
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', credentials);
  }
}
