// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterContentComponent } from './register-content.component';
import { RegisterService } from '../services/register.service';
import { ServiceAuth } from '@custom/services/auth/service.auth';
import { TranslateService } from '@ngx-translate/core';
import { ServiceModals } from '@custom/services/plugins/service.modals';

@Injectable()
class MockRegisterService {}

@Injectable()
class MockTranslateService {
  translate() {}
  instant() {}
}
@Injectable()
class MockServiceAuth {
  register() {}
}
@Injectable()
class MockServiceModals {
  showLoading() {}
  hideLoading() {}
  showToast() {}
}

describe('RegisterContentComponent', () => {
  let fixture: ComponentFixture<RegisterContentComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [RegisterContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: RegisterService, useClass: MockRegisterService },
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: ServiceAuth, useClass: MockServiceAuth },
        { provide: ServiceModals, useClass: MockServiceModals },
      ],
    })
      .overrideComponent(RegisterContentComponent, {
        set: {
          providers: [
            { provide: RegisterService, useClass: MockRegisterService },
          ],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(RegisterContentComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #register()', async () => {
    spyOn(component.serviceModals, 'showLoading');
    spyOn(component.serviceModals, 'hideLoading');
    spyOn(component.serviceModals, 'showToast');
    spyOn(component.translate, 'instant');
    component.serviceAuth = component.serviceAuth || {};
    spyOn(component.serviceAuth, 'register').and.returnValue(
      new Promise((resolve) => {
        return resolve({});
      })
    );
    component.form = component.form || {};
    component.form.value = 'value';
    await component.register();
    expect(component.serviceModals.showLoading).toHaveBeenCalled();
    expect(component.serviceModals.hideLoading).toHaveBeenCalled();
    expect(component.serviceModals.showToast).toHaveBeenCalled();
    expect(component.translate.instant).toHaveBeenCalled();
    expect(component.serviceAuth.register).toHaveBeenCalled();
  });
});
