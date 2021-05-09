// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountContentComponent } from './account-content.component';
import { AccountContentService } from '../services/account-content.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { ServiceApi } from '@custom/services/utils/service.api';
import { TranslateService } from '@ngx-translate/core';
import { ServiceModals } from '@custom/services/utils/service.modals';
import { ProviderIdentity } from '@custom/entities/identity/provider/provider.identity';

@Injectable()
class MockAccountContentService {}

@Injectable()
class MockTranslateService {
  instant() {}
}
@Injectable()
class MockServiceAuth {}
@Injectable()
class MockServiceApi {}
@Injectable()
class MockServiceModals {
  showLoading() {}
  hideLoading() {}
  showToast() {}
}
@Injectable()
class MockProviderIdentity {
  updateAccount() {}
}

describe('AccountContentComponent', () => {
  let fixture: ComponentFixture<AccountContentComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AccountContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ServiceAuth, useClass: MockServiceAuth },
        { provide: ServiceApi, useClass: MockServiceApi },
        { provide: ServiceModals, useClass: MockServiceModals },
        { provide: ProviderIdentity, useClass: MockProviderIdentity },
      ],
    })
      .overrideComponent(AccountContentComponent, {
        set: {
          providers: [
            {
              provide: AccountContentService,
              useClass: MockAccountContentService,
            },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(AccountContentComponent);
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

  it('should run #updateAccount()', async () => {
    component.serviceModals = component.serviceModals || {};
    spyOn(component.serviceModals, 'showLoading');
    spyOn(component.serviceModals, 'hideLoading');
    spyOn(component.serviceModals, 'showToast');
    component.translate = component.translate || {};
    spyOn(component.translate, 'instant');
    component.providerIdentity = component.providerIdentity || {};
    spyOn(component.providerIdentity, 'updateAccount').and.returnValue(
      new Promise((resolve) => {
        return resolve({});
      })
    );
    component.form = component.form || {};
    component.form.value = 'value';
    await component.updateAccount();
    expect(component.providerIdentity.updateAccount).toHaveBeenCalled();
    expect(component.serviceModals.showLoading).toHaveBeenCalled();
    expect(component.serviceModals.hideLoading).toHaveBeenCalled();
    expect(component.serviceModals.showToast).toHaveBeenCalled();
    expect(component.translate.instant).toHaveBeenCalled();
  });
});
