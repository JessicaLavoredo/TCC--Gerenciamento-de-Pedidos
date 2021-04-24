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

  async login(user: Usuario) {
    const json = JSON.stringify(user);
    const result = await this.http.post<any>(environment.api + 'Usuario/login', json).toPromise();
    if (result.length > 0) {
      if (result[0].IdUsuario > 0) {
        window.localStorage.setItem('token', '123');
        window.localStorage.setItem('logado', result[0].IdUsuario);
        window.localStorage.setItem('perfil', result[0].IdPerfil);
        return true;
      }
    }
    return false;
  }


}

