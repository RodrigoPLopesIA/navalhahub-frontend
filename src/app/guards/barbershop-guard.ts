import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const barbershopGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const selectedBarbershopId = localStorage.getItem('selectedBarbershopId');

  if (selectedBarbershopId) {
    return true;
  }

  return router.createUrlTree(['/barbershops'], {
    queryParams: {
      returnUrl: state.url
    }
  });
};

