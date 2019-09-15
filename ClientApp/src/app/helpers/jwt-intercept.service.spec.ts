import { TestBed } from '@angular/core/testing';

import { JwtInterceptService } from './jwt-intercept.service';

describe('JwtInterceptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtInterceptService = TestBed.get(JwtInterceptService);
    expect(service).toBeTruthy();
  });
});
