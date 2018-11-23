import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private http: HttpClient, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkSession();
  }

  private checkSession(): Observable<boolean> {
    return this.http.get<boolean>('/api/isValid').pipe(
      map(isValid => {
        if (!isValid) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      })
    );
  }
}
