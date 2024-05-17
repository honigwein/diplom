import { TestBed } from '@angular/core/testing';

import { TokenExpirationCheckService } from './token-expiration-check.service';

describe('TokenExpirationCheckService', () => {
  let service: TokenExpirationCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenExpirationCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
