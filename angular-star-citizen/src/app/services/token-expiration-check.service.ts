import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, Subscription, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from './api.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenExpirationCheck {
  private readonly TOKEN_REFRESH_INTERVAL = 60000;
  private refreshSubscription: Subscription = new Subscription();

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) { }

  public isAccessTokenExpired(): Observable<boolean> {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      return this.refreshToken().pipe(
        map(() => false),
        catchError(() => of(true))
      );
    }

    const decodedToken: any = jwtDecode(access_token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    if (expirationTime < currentTime-60000) {
      return this.refreshToken().pipe(
        map(() => false),
        catchError(() => of(true))
      );
    } else {
      return of(false);
    }
  }

  private refreshToken(): Observable<void> {
    const refresh_token = localStorage.getItem('refresh_token');

    if (!refresh_token) {
      console.error('No refresh token available');
      return throwError('No refresh token available');
    }
    console.log('Refreshing token...');
    return this.apiService.request('token/refresh/', 'POST', { refresh: refresh_token }).pipe(
      map((response: any) => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
      })
    );
  }

  public startTokenRefreshCheck(): void {
    this.refreshSubscription = interval(this.TOKEN_REFRESH_INTERVAL).subscribe(() => {
      this.checkTokenExpiration();
    });
  }

  public stopTokenRefreshCheck(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private async checkTokenExpiration(): Promise<void> {
    try {
      const expired = await this.isAccessTokenExpired().toPromise();
      if (expired) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error checking token expiration:', error);
    }
  }
}
