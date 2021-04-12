import { TestBed } from '@angular/core/testing';

import { LoginIdentityService } from './login-identity.service';

describe('LoginService', () => {
  let service: LoginIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
