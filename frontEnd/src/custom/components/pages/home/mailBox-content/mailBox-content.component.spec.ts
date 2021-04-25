import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailBoxContentComponent } from './mailBox-content.component';

describe('MailBoxesContentComponent', () => {
  let component: MailBoxContentComponent;
  let fixture: ComponentFixture<MailBoxContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailBoxContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailBoxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
