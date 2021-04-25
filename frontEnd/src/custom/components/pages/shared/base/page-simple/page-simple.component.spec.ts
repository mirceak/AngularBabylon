import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSimpleComponent } from './page-simple.component';

describe('PageSimpleComponent', () => {
  let component: PageSimpleComponent;
  let fixture: ComponentFixture<PageSimpleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
