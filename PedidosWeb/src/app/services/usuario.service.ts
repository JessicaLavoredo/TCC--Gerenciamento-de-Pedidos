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
    return this.http.get<Usuario[]>(environment.api + 'Usuario/buscartodos');
  }

  async gravar(Usuario: Usuario) {
    const json = JSON.stringify(Usuario);
    const result: any = await Api.post('Usuario/gravar', json);
    return result;
  }

  async BuscarPorId(Codigo: String) {
    return new Promise(resolve => {
      this.http.get(environment.api + '/Pessoa/buscarPorId/' + Codigo).subscribe(result => {
        resolve(result);
      });
    })
  }

  public buscarTodosFuncionarios() {
    return this.http.get<Pessoa[]>(environment.api + 'Pessoa/buscartodos');
  }
}
