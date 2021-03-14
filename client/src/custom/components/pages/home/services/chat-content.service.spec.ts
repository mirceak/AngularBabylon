import { TestBed } from '@angular/core/testing';

import { ChatContentService } from './chat-content.service';

describe('ChatContentService', () => {
  let service: ChatContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
