// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { NavListSimpleComponent } from './nav-list-simple.component';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { TranslateService } from '@ngx-translate/core';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
import { ServiceModals } from '@custom/services/plugins/service.modals';
import { ProviderUser } from '@custom/entities/user/provider/provider.user';
import { ProviderIdentity } from '@custom/entities/identity/provider/provider.identity';

@Injectable()
class MockTranslateService {
  translate() {}
  instant() {}
}
@Injectable()
class MockServiceInternationalization {
  setLanguage() {}
}

@Injectable()
class MockServiceModals {
  showLoading() {}
  hideLoading() {}
  showToast() {}
  confirm() {}
}
@Injectable()
class MockProviderIdentity {
  updateAccount() {}
}
@Injectable()
class MockServiceAuth {
  logout() {}
}

@Injectable()
class MockProviderUser {}

describe('NavListSimpleComponent', () => {
  let fixture: ComponentFixture<NavListSimpleComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [NavListSimpleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ServiceAuth, useClass: MockServiceAuth },
        { provide: ServiceModals, useClass: MockServiceModals },
        {
          provide: ServiceInternationalization,
          useClass: MockServiceInternationalization,
        },
        { provide: ProviderUser, useClass: MockProviderUser },
        { provide: ProviderIdentity, useClass: MockProviderIdentity },
      ],
    })
      .overrideComponent(NavListSimpleComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(NavListSimpleComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('should run #logout()', async () => {
    component.serviceModals = component.serviceModals || {};
    spyOn(component.serviceModals, 'confirm').and.returnValue(
      new Promise((resolve) => {
        return resolve({
          isConfirmed: true,
        });
      })
    );
    spyOn(component.serviceModals, 'showToast');
    spyOn(component.translate, 'instant');
    spyOn(component.serviceAuth, 'logout');
    await component.logout();
    expect(component.serviceModals.confirm).toHaveBeenCalled();
    expect(component.serviceModals.showToast).toHaveBeenCalled();
    expect(component.translate.instant).toHaveBeenCalled();
    expect(component.serviceAuth.logout).toHaveBeenCalled();
  });

  it('should run #onChangeLang()', async () => {
    spyOn(component.serviceModals, 'showLoading');
    spyOn(component.serviceModals, 'showToast');
    spyOn(component.serviceModals, 'hideLoading');
    spyOn(component.translate, 'instant');
    component.internationalization = component.internationalization || {};
    spyOn(component.internationalization, 'setLanguage').and.returnValue(
      observableOf(
        new Promise((resolve) => {
          return resolve({});
        })
      )
    );
    await component.onChangeLang({
      value: {},
      source: {
        value: {},
      },
    });
    expect(component.serviceModals.showLoading).toHaveBeenCalled();
    expect(component.serviceModals.showToast).toHaveBeenCalled();
    expect(component.serviceModals.hideLoading).toHaveBeenCalled();
    expect(component.translate.instant).toHaveBeenCalled();
    expect(component.internationalization.setLanguage).toHaveBeenCalled();
  });

  it('should run #onChangeNav()', async () => {
    component.changedNav = component.changedNav || {};
    spyOn(component.changedNav, 'emit');
    component.onChangeNav();
    expect(component.changedNav.emit).toHaveBeenCalled();
  });
});
