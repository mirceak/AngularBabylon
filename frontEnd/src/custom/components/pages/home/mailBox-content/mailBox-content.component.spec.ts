// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MailBoxContentComponent } from './mailBox-content.component';
import { MailBoxContentService } from '../services/mailBox-content.service';
import { ProviderMailBox } from '@custom/entities/mailBox/provider/provider.mailBox';
import { TranslateService } from '@ngx-translate/core';
import { ServiceApi } from '@custom/services/utils/service.api';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { ServiceAuth } from '@custom/services/auth/service.auth';

@Injectable()
class MockTranslateService {
  translate() {}
  instant() {}
}
@Injectable()
class MockMailBoxContentService {}
@Injectable()
class MockServiceApi {}
@Injectable()
class MockProviderMailBox {
  accMailBox() {}
  reqMailBox() {}
}
@Injectable()
class MockServiceModals {
  showLoading() {}
  hideLoading() {}
  showToast() {}
}

describe('MailBoxContentComponent', () => {
  let fixture: ComponentFixture<MailBoxContentComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [MailBoxContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MailBoxContentService, useClass: MockMailBoxContentService },
        { provide: ProviderMailBox, useClass: MockProviderMailBox },
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ServiceApi, useClass: MockServiceApi },
        { provide: ServiceModals, useClass: MockServiceModals },
      ],
    })
      .overrideComponent(MailBoxContentComponent, {
        set: {
          providers: [
            {
              provide: MailBoxContentService,
              useClass: MockMailBoxContentService,
            },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(MailBoxContentComponent);
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

  it('should run #addMailBox()', async () => {
    spyOn(component.serviceModals, 'showLoading');
    spyOn(component.serviceModals, 'showToast');
    spyOn(component.serviceModals, 'hideLoading');
    spyOn(component.translate, 'instant');
    spyOn(component.providerMailBox, 'reqMailBox').and.returnValue(
      new Promise((resolve) => {
        return resolve({});
      })
    );
    component.form = component.form || {};
    component.form.value = 'value';
    await component.addMailBox();
    expect(component.serviceModals.showLoading).toHaveBeenCalled();
    expect(component.serviceModals.showToast).toHaveBeenCalled();
    expect(component.serviceModals.hideLoading).toHaveBeenCalled();
    expect(component.translate.instant).toHaveBeenCalled();
    expect(component.providerMailBox.reqMailBox).toHaveBeenCalled();
  });

  it('should run #acceptMailBox()', async () => {
    spyOn(component.serviceModals, 'showLoading');
    spyOn(component.serviceModals, 'showToast');
    spyOn(component.serviceModals, 'hideLoading');
    spyOn(component.translate, 'instant');
    spyOn(component.providerMailBox, 'accMailBox').and.returnValue(
      new Promise((resolve) => {
        return resolve({});
      })
    );
    component.acceptForm = component.acceptForm || {};
    component.acceptForm.value = 'value';
    await component.acceptMailBox();
    expect(component.serviceModals.showLoading).toHaveBeenCalled();
    expect(component.serviceModals.showToast).toHaveBeenCalled();
    expect(component.serviceModals.hideLoading).toHaveBeenCalled();
    expect(component.translate.instant).toHaveBeenCalled();
    expect(component.providerMailBox.accMailBox).toHaveBeenCalled();
  });
});
