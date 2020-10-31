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
  public buscarTodos(){
    return this.http.get<PerfilUsuario[]>(environment.api + 'Perfil/buscartodos');
  }

  async gravar(Perfil: PerfilUsuario){
    const json = JSON.stringify(Perfil);
    const result: any =  await Api.post('Perfil/gravar', json);
    if (result.length > 0){
        console.log(result);
        return true;
      }else{
      return false;
      }
    }
}
