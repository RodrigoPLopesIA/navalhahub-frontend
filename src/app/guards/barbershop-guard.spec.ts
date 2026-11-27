import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { barbershopGuard } from './barbershop-guard';

describe('barbershopGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => barbershopGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
