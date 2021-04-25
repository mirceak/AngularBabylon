import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralContentComponent } from './referral-content.component';

describe('ReferralContentComponent', () => {
  let component: ReferralContentComponent;
  let fixture: ComponentFixture<ReferralContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
