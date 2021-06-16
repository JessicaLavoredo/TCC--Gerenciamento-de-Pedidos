import { PerfilUsuario } from './../class/perfil-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {
  constructor(private http: HttpClient) { }
  public buscarTodos() {
    return this.http.get<PerfilUsuario[]>('api/Perfil/buscartodos');
  }

  async gravar(Perfil: PerfilUsuario) {
    return new Promise(resolve => {
      const json = JSON.stringify(Perfil);
      this.http.post('api/Perfil/gravar', json).subscribe(result => {
        let resultado = {
          resultado: result,
          status: 200
        };
        resolve(resultado);
      }, error => {
        let resultado = {
          resultado: error,
          status: 401
        };
        resolve(resultado);
      });
    })
  }

  async excluir(Perfil: PerfilUsuario) {
    return new Promise(resolve => {
      const json = JSON.stringify(Perfil);
      this.http.post('api/Perfil/deletar', json).subscribe(result => {
        let resultado = {
          resultado: result,
          status: 200
        };
        resolve(resultado);
      }, error => {
        let resultado = {
          resultado: error,
          status: 401
        };
        resolve(resultado);
      });
    })
  }


}

