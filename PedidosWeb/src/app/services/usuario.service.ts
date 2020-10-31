import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../class/usuario';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  public buscarTodos(){
    return this.http.get<Usuario[]>(environment.api + 'Usuario/buscartodos');
  }

  async gravar(Usuario: Usuario){
    const json = JSON.stringify(Usuario);
    const result: any =  await Api.post('Usuario/gravar', json);
    if (result.length > 0){
        console.log(result);
        return true;
      }else{
      return false;
      }
    }
}
