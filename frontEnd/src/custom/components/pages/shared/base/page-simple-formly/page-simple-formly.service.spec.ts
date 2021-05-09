import { TestBed } from '@angular/core/testing';

import { PageFormlyService } from './page-simple-formly.service';

describe('PageFormlyService', () => {
  let service: PageFormlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageFormlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
