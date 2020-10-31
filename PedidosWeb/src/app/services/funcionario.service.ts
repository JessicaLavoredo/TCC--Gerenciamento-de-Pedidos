import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../class/funcionario';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  constructor(private http: HttpClient) { }

  public buscarTodos(){
    return this.http.get<Funcionario[]>(environment.api + 'CategoriaEmail/buscartodos');
  }

  async gravar(funcionario: Funcionario){
    const json = JSON.stringify(funcionario);
    const result: any =  await Api.post('CategoriaFuncionario/gravar', json);
    if (result.length > 0){
        console.log(result);
        return true;
      }else{
      return false;
      }
    }
}
