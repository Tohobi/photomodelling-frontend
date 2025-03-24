import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    } else {
      alert('Bitte melde dich an, um auf diese Seite zuzugreifen.');
      this.router.navigate(['/']);
      return false;
    }
  }
}
