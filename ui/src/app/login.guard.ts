import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkSession();
  }

  private checkSession(): Observable<boolean> {
    return this.http.get<boolean>('/api/isValid').pipe(
      map(isValidSession => {
        if (isValidSession) {
          this.router.navigate(['home']);
          return false;
        }
        return true;
      })
    );
  }
}
