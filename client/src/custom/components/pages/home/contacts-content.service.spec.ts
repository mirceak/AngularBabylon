import { TestBed } from '@angular/core/testing';

import { ContactsContentService } from './contacts-content.service';

describe('ContactsContentService', () => {
  let service: ContactsContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
