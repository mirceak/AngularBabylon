import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavListSimpleComponent } from './nav-list-simple.component';

describe('NavListSimpleComponent', () => {
  let component: NavListSimpleComponent;
  let fixture: ComponentFixture<NavListSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavListSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavListSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
