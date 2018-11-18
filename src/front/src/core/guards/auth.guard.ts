import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { loginTokenKey } from 'src/core/services/abstracts/signalr/signalr.core.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const result = !!localStorage.getItem(loginTokenKey);
    if (!result) {
      this.router.navigate(['/auth']);
    }
    return result;
  }
}
