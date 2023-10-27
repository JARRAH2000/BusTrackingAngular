import { TestBed } from '@angular/core/testing';

import { EmployeestatusService } from './employeestatus.service';

describe('EmployeestatusService', () => {
  let service: EmployeestatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeestatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
