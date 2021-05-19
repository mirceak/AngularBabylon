import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Router } from '@angular/router';
import { ServiceAuth } from '../service.auth';
import { TranslateService } from '@ngx-translate/core';
import { ServiceModals } from '@custom/services/plugins/service.modals';
import { GuardAuthIdentity } from './guard.auth-identity';

@Injectable()
class MockRouter {
  navigate() {}
}

@Injectable()
class MockServiceAuth {
  serviceApi: any;
}

@Injectable()
class MockServiceModals {
  showToast() {}
}

@Injectable()
class MockTranslateService {
  translate() {}
  instant() {}
}

describe('GuardAuth', () => {
  let service: GuardAuthIdentity;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ServiceAuth, useClass: MockServiceAuth },
        { provide: Router, useClass: MockRouter },
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ServiceModals, useClass: MockServiceModals },
      ],
    });
    service = TestBed.inject(GuardAuthIdentity);
  });

  it('should run #canActivate()', async () => {
    service.serviceAuth = service.serviceAuth || {};
    service.serviceAuth.serviceApi = Object.assign(
      service.serviceAuth.serviceApi || {},
      {
        sessionToken: new BehaviorSubject<any>({}),
        loggedIn: new BehaviorSubject<any>(null),
      }
    );
    service.serviceModals = service.serviceModals || {};
    spyOn(service.serviceModals, 'showToast');
    service.translate = service.translate || {};
    spyOn(service.translate, 'instant');
    service.router = service.router || {};
    spyOn(service.router, 'navigate');
    await service.canActivate();
    expect(service.serviceModals.showToast).toHaveBeenCalled();
    expect(service.translate.instant).toHaveBeenCalled();
    expect(service.router.navigate).toHaveBeenCalled();
  });
});
