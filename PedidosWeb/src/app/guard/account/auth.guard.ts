import { AccountService } from 'src/app/services/account.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private AccountService: AccountService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = this.AccountService.getAuthorizationToken();
    const tokenexpired = this.AccountService.isTokenExpired(token);
    const tipo = this.AccountService.getTipoUser();
    if (token && !tokenexpired && (tipo == '1' || tipo == '2' || tipo == '3')) {
      return true;
    } else {
      this.router.navigate(['login']);
      window.localStorage.removeItem('token');
      return false;
    }


  }

}
