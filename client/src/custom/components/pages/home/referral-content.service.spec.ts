import { TestBed } from '@angular/core/testing';

import { ReferralContentService } from './referral-content.service';

describe('ReferralContentService', () => {
  let service: ReferralContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferralContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
