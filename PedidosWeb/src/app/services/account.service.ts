import { UsuarioLogin } from './../class/usuariologin';
import { environment } from './../../environments/environment';
import { Usuario } from '../class/usuario';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }


  async login(user: UsuarioLogin) {
    console.log(JSON.stringify(user))
    const result = await this.http.post<any>('api/Usuario/login', JSON.stringify(user)).toPromise();
    if (result && result.Authorization) {
      window.localStorage.setItem('token', result.Authorization);
      return true;
    }
    return false;
  }


  getTokenExpirationDate(Token: string) {
    const decoded: any = jwtDecode(Token);
    if (decoded.exp === undefined) {
      return null
    }
    const dateexp = new Date(decoded.exp)
    const date = new Date(0);
    date.setUTCSeconds(dateexp.valueOf());
    return date;
  }

  isTokenExpired(Token?: string) {
    if (!Token) {
      return true;
    }
    const date = this.getTokenExpirationDate(Token);
    if (date === undefined) {
      return false;
    }

    return (date.valueOf() < new Date().valueOf());

  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem("token")
    return token
  }

  getTipoUser() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return ""
    } else {
      const decoded: any = jwtDecode(token);
      if (decoded.idPerfil === undefined) {
        return null
      }
      return decoded.idPerfil
    }
  }

  getUsuario() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return ""
    } else {
      const decoded: any = jwtDecode(token);
      if (decoded.idUsuario === undefined) {
        return null
      }
      return decoded.idUsuario
    }
  }

}

