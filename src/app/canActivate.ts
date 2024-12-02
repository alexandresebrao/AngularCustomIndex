import {CanActivateFn, Router} from '@angular/router';
import {inject, REQUEST_CONTEXT} from '@angular/core';

export const canActivate:  CanActivateFn = () => {
  const requestContext = inject(REQUEST_CONTEXT, {optional: true}) as { user: {username: string}}
  const router = inject(Router)
  if (requestContext.user) {
    return true
  }
  router.navigate(['/login'])
  return false
}
