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


  async login(user: Usuario) {
    //const result = await this.http.post<any>(environment.api + 'Usuario/login', JSON.stringify(user)).toPromise();
    console.log(jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBcmFwb25nYS1CYWNrZW5kIiwiaWF0Ijp7ImRhdGUiOiIyMDIxLTA1LTA2IDE5OjM3OjA1Ljc2OTA1MyIsInRpbWV6b25lX3R5cGUiOjMsInRpbWV6b25lIjoiQW1lcmljYVwvU2FvX1BhdWxvIn0sIm5iZiI6eyJkYXRlIjoiMjAyMS0wNS0wNiAxOTozNzowNS43NjkwNjMiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFtZXJpY2FcL1Nhb19QYXVsbyJ9LCJleHAiOnsiZGF0ZSI6IjIwMjEtMDUtMDYgMjA6Mzc6MDUuNzY5MDY2IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBbWVyaWNhXC9TYW9fUGF1bG8ifSwiaWRfdXN1YXJpbyI6IjEiLCJpZF9wZXJmaWwiOiIxIn0.LzNOUuDwIdqalpHYS-jSq2f9zqDNp6VNeT2CKrfEElU"))
    // if (result.length > 0) {
    //   if (result[0].IdUsuario > 0) {
    //     window.localStorage.setItem('token', '123');
    //     return true;
    //   }
    // }
    return false;
  }


  getTokenExpirationDate(Token: string) {
    const decoded: any = jwtDecode(Token);
    if (decoded.exp === undefined) {
      return null
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
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
    return !(date.valueOf() > new Date().valueOf());

  }

  isUserLoggedIn() {
    const token = this.getAutorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  getAutorizationToken() {
    const token = window.localStorage.getItem("token")
    return token
  }

  getTipoUser() {
    const token = this.getAutorizationToken();
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
    const token = this.getAutorizationToken();
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

}

