import { Cidade } from './../interface/cidade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../class/funcionario';
import Api from './Api';
import { CategoriaEndereco } from '../class/categoria-endereco';
import { CategoriaEmail } from '../class/categoria-email';
import { CategoriaTelefone } from '../class/categoria-telefone';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  constructor(private http: HttpClient) { }

  public buscarTodos(){
    return this.http.get<Funcionario[]>(environment.api + 'Funcionario/buscartodos');
  }

  async gravar(funcionario: Funcionario){
    const json = JSON.stringify(funcionario);
    const result: any =  await Api.post('Funcionario/gravar', json);
    if (result.length > 0){
        console.log(result);
        return true;
      }else{
      return false;
      }
    }

    public buscarTodasCidades(){
      return this.http.get<Cidade[]>(environment.api + 'Cidade/buscartodos');
    }

    public buscarTodosCatEnderecos(){
      return this.http.get<CategoriaEndereco[]>(environment.api + 'CategoriaEndereco/buscartodos');
    }

    public buscarTodosCatEmails(){
      return this.http.get<CategoriaEmail[]>(environment.api + 'CategoriaEmail/buscartodos');
    }

    public buscarTodosCatTelefones(){
      return this.http.get<CategoriaTelefone[]>(environment.api + 'CategoriaTelefone/buscartodos');
    }
}
