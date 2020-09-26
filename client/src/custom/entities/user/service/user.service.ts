import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseEntityService } from '@custom/services/entities/base/base.entity.service';
import { User } from '@custom/entities/user/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseEntityService<User> {
  constructor(http: HttpClient) {
    super(http, {
      pathNamePlural: 'users',
      pathName: 'user',
    });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/user', user);
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', credentials);
  }
}
