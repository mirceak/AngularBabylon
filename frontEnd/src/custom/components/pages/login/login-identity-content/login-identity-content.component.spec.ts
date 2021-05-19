// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { LoginIdentityContentComponent } from './login-identity-content.component';
import { LoginIdentityService } from '../services/login-identity.service';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { TranslateService } from '@ngx-translate/core';
import { ServiceModals } from '@custom/services/plugins/service.modals';

@Injectable()
class MockLoginIdentityService {}

@Injectable()
class MockServiceInternationalization {}

@Injectable()
class MockTranslateService {
  translate() {}
  instant() {}
}
@Injectable()
class MockServiceAuth {
  login() {}
}
@Injectable()
class MockServiceModals {
  showLoading() {}
  hideLoading() {}
  showToast() {}
}

describe('LoginIdentityContentComponent', () => {
  let fixture: ComponentFixture<LoginIdentityContentComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [LoginIdentityContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: LoginIdentityService, useClass: MockLoginIdentityService },
        { provide: ServiceAuth, useClass: MockServiceAuth },
        {
          provide: ServiceInternationalization,
          useClass: MockServiceInternationalization,
        },
        { provide: ServiceModals, useClass: MockServiceModals },
        { provide: TranslateService, useClass: MockTranslateService },
      ],
    })
      .overrideComponent(LoginIdentityContentComponent, {
        set: {
          providers: [
            {
              provide: LoginIdentityService,
              useClass: MockLoginIdentityService,
            },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(LoginIdentityContentComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #login()', async () => {
    spyOn(component.serviceModals, 'showLoading');
    spyOn(component.serviceModals, 'showToast');
    spyOn(component.translate, 'instant');
    component.serviceAuth.providerIdentity = {
      login: function () {
        return new Promise((resolve) => {
          return resolve({});
        });
      },
    };
    component.form = component.form || {};
    component.form.value = 'value';
    component.internationalization.setLang = {
      subscribe: (method: any) => {
        return { unsubscribe: () => {}, callback: method() };
      },
    };
    await component.login();
    expect(component.serviceModals.showLoading).toHaveBeenCalled();
    expect(component.serviceModals.showToast).toHaveBeenCalled();
    expect(component.translate.instant).toHaveBeenCalled();
  });
});
