import { TestBed } from '@angular/core/testing';

import { TripdirectionService } from './tripdirection.service';

describe('TripdirectionService', () => {
  let service: TripdirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripdirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
