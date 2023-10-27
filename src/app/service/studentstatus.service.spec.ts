import { TestBed } from '@angular/core/testing';

import { StudentstatusService } from './studentstatus.service';

describe('StudentstatusService', () => {
  let service: StudentstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
