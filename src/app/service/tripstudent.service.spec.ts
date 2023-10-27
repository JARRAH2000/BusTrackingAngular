import { TestBed } from '@angular/core/testing';

import { TripstudentService } from './tripstudent.service';

describe('TripstudentService', () => {
  let service: TripstudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripstudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
