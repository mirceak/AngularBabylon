// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomeContentComponent } from './home-content.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
class MockTranslateService {
  translate() {}
}

describe('HomeContentComponent', () => {
  let fixture: ComponentFixture<HomeContentComponent>;
  let component: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeContentComponent);
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
});
