// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutSimpleComponent } from './layout-simple.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ServiceInternationalization } from '@custom/services/utils/service.internationalization';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
class MockRouter {
  navigate() {}
}
@Injectable()
class MockServiceInternationalization {}

@Injectable()
class MockTranslateService {
  translate() {}
}

describe('LayoutSimpleComponent', () => {
  let fixture: ComponentFixture<LayoutSimpleComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [LayoutSimpleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ChangeDetectorRef,
        MediaMatcher,
        { provide: Router, useClass: MockRouter },
        {
          provide: ServiceInternationalization,
          useClass: MockServiceInternationalization,
        },
        { provide: TranslateService, useClass: MockTranslateService },
      ],
    })
      .overrideComponent(LayoutSimpleComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(LayoutSimpleComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #changedNav()', async () => {
    expect(
      component.changedNav({
        toggle: function () {},
      })
    ).toBeUndefined();
  });

  it('should run #ngOnDestroy()', async () => {
    component.mobileQuery = component.mobileQuery || {};
    spyOn(component.mobileQuery, 'removeEventListener');
    component.ngOnDestroy();
    expect(component.mobileQuery.removeEventListener).toHaveBeenCalled();
  });
});
