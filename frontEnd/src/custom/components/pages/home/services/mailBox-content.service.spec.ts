import { TestBed } from '@angular/core/testing';

import { MailBoxContentService } from './mailBox-content.service';

describe('MailBoxesContentService', () => {
  let service: MailBoxContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailBoxContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
