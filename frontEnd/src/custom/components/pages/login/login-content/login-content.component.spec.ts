// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginContentComponent } from './login-content.component';
import { LoginService } from '../services/login.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { TranslateService } from '@ngx-translate/core';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { ServiceApi } from '@custom/services/utils/service.api';

@Injectable()
class MockLoginService {}

@Injectable()
class MockTranslateService {
  translate() {}
  instant() {}
}
@Injectable()
class MockServiceApi {}
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

describe('LoginContentComponent', () => {
  let fixture: ComponentFixture<LoginContentComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [LoginContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ServiceApi, useClass: MockServiceApi },
        { provide: ServiceAuth, useClass: MockServiceAuth },
        { provide: ServiceModals, useClass: MockServiceModals },
      ],
    })
      .overrideComponent(LoginContentComponent, {
        set: {
          providers: [{ provide: LoginService, useClass: MockLoginService }],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(LoginContentComponent);
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
    spyOn(component.serviceModals, 'hideLoading');
    spyOn(component.serviceModals, 'showToast');
    spyOn(component.translate, 'instant');
    spyOn(component.serviceAuth, 'login').and.returnValue(
      new Promise((resolve) => {
        return resolve({});
      })
    );
    component.form = component.form || {};
    component.form.value = 'value';
    await component.login();
    expect(component.serviceModals.showLoading).toHaveBeenCalled();
    expect(component.serviceModals.hideLoading).toHaveBeenCalled();
    expect(component.serviceModals.showToast).toHaveBeenCalled();
    expect(component.translate.instant).toHaveBeenCalled();
    expect(component.serviceAuth.login).toHaveBeenCalled();
  });
});
