import { environment } from './../../environments/environment';
import { Usuario } from '../class/usuario';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  // public login(user: Usuario): Observable<Usuario>{
  //   return this.http.post<Usuario>(environment.api, user);
  // }

  async login(user: Usuario) {

    const result = await this.http.post<any>(environment.api + 'Usuario/Login', user).toPromise();
    if (result.length >= 0) {
      window.localStorage.setItem('token', '123');
      return true;
    }
    return false;
  }


}


