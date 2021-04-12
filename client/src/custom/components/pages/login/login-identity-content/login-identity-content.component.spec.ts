import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginIdentityContentComponent } from './login-identity-content.component';

describe('LoginContentComponent', () => {
  let component: LoginIdentityContentComponent;
  let fixture: ComponentFixture<LoginIdentityContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginIdentityContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginIdentityContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
