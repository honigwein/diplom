import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenExpirationCheck } from './token-expiration-check.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenExpirationCheck: TokenExpirationCheck, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.tokenExpirationCheck.isAccessTokenExpired().pipe(
      map(isExpired => {
        if (isExpired) {
          this.router.navigate(['/login']);
          return false;
          }
        return true;
      })
    );
  }
}
