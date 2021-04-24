import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdm implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = window.localStorage.getItem('token');
    const tipo = window.localStorage.getItem('perfil')
    if (token && tipo == '1') {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }

}
