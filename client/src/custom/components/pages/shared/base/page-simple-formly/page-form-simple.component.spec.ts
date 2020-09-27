import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormSimpleComponent } from './page-form-simple.component';

describe('FormSimpleComponent', () => {
  let component: PageFormSimpleComponent;
  let fixture: ComponentFixture<PageFormSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFormSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFormSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
