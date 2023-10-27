import { TestBed } from '@angular/core/testing';

import { AuthorizerGuard } from './authorizer.guard';

describe('AuthorizerGuard', () => {
  let guard: AuthorizerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
