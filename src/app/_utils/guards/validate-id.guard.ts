import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
class ValidateIdGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = route.paramMap.get('id');
    if (!id || isNaN(+id)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

export default ValidateIdGuard;
