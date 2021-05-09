// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferralContentComponent } from './referral-content.component';
import { ReferralContentService } from '../services/referral-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceApi } from '@custom/services/utils/service.api';
import { TranslateService } from '@ngx-translate/core';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { ProviderReferral } from '@custom/entities/referral/provider/provider.referral';

@Injectable()
class MockReferralContentService {}

@Injectable()
class MockTranslateService {
  translate() {}
  instant() {}
}
@Injectable()
class MockServiceApi {}
@Injectable()
class MockServiceModals {
  showLoading() {}
  hideLoading() {}
  showToast() {}
}
@Injectable()
class MockServiceAuth {}
@Injectable()
class MockProviderReferral {
  reqSignup() {}
}

describe('ReferralContentComponent', () => {
  let fixture: ComponentFixture<ReferralContentComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ReferralContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ReferralContentService,
          useClass: MockReferralContentService,
        },
        { provide: ServiceAuth, useClass: MockServiceAuth },
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ServiceApi, useClass: MockServiceApi },
        { provide: ServiceModals, useClass: MockServiceModals },
        { provide: ProviderReferral, useClass: MockProviderReferral },
      ],
    })
      .overrideComponent(ReferralContentComponent, {
        set: {
          providers: [
            {
              provide: ReferralContentService,
              useClass: MockReferralContentService,
            },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(ReferralContentComponent);
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

  it('should run #referr()', async () => {
    spyOn(component.serviceModals, 'showLoading');
    spyOn(component.serviceModals, 'hideLoading');
    spyOn(component.serviceModals, 'showToast');
    spyOn(component.translate, 'instant');
    spyOn(component.providerReferral, 'reqSignup').and.returnValue(
      new Promise((resolve) => {
        return resolve({});
      })
    );
    component.form = component.form || {};
    component.form.value = 'value';
    await component.referr();
    expect(component.serviceModals.showLoading).toHaveBeenCalled();
    expect(component.serviceModals.hideLoading).toHaveBeenCalled();
    expect(component.serviceModals.showToast).toHaveBeenCalled();
    expect(component.translate.instant).toHaveBeenCalled();
    expect(component.providerReferral.reqSignup).toHaveBeenCalled();
  });
});
