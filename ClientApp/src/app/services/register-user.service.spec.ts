import { TestBed } from '@angular/core/testing';

import { RegisterUserService } from './register-user.service';

describe('RegisterUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterUserService = TestBed.get(RegisterUserService);
    expect(service).toBeTruthy();
  });
});
