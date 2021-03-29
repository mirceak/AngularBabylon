import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterContentComponent } from './register-content.component';

describe('RegisterContentComponent', () => {
  let component: RegisterContentComponent;
  let fixture: ComponentFixture<RegisterContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
