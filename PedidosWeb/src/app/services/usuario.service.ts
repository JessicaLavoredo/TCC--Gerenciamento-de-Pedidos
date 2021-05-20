import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../class/Pessoa';
import { Usuario } from '../class/usuario';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<Usuario[]>('api/Usuario/buscartodos');
  }

  async gravar(Usuario: Usuario) {
    return new Promise(resolve => {
      const json = JSON.stringify(Usuario);
      this.http.post('api/Usuario/gravar', json).subscribe(result => {
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

  async BuscarPorId(Codigo: String) {
    return new Promise(resolve => {
      this.http.get('api/Usuario/buscarPorId/' + Codigo).subscribe(result => {
        resolve(result);
      });
    })
  }

  public buscarTodosFuncionarios() {
    return this.http.get<Pessoa[]>('api/Pessoa/buscartodos');
  }
}
