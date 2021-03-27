import { Vinculo } from './../class/vinculo';
import { Cidade } from './../interface/cidade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Api from './Api';
import { CategoriaEndereco } from '../class/categoria-endereco';
import { CategoriaEmail } from '../class/categoria-email';
import { CategoriaTelefone } from '../class/categoria-telefone';
import { Pessoa } from '../class/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<Pessoa[]>(environment.api + 'Pessoa/buscartodos');
  }

  async gravar(funcionario: Pessoa) {
    const json = JSON.stringify(funcionario);
    const result: any = await Api.post('Pessoa/gravar', json);
    if (result.length > 0) {
      return result;
    }
  }

  public buscaPorCEP(Cep: String) {
    const teste = 'https://viacep.com.br/ws/' + Cep + '/json/';
    const result: any = this.http.get(teste);
    return JSON.parse(result);
  }

  public buscarTodasCidades() {
    return this.http.get<Cidade[]>(environment.api + 'Cidade/buscartodos');
  }

  public buscarTodosCatEnderecos() {
    return this.http.get<CategoriaEndereco[]>(environment.api + 'CategoriaEndereco/buscartodos');
  }

  public buscarTodosCatEmails() {
    return this.http.get<CategoriaEmail[]>(environment.api + 'CategoriaEmail/buscartodos');
  }

  public buscarTodosCatTelefones() {
    return this.http.get<CategoriaTelefone[]>(environment.api + 'CategoriaTelefone/buscartodos');
  }

  public buscarTodosVinculos() {
    return this.http.get<Vinculo[]>(environment.api + 'Vinculo/buscartodos');
  }
}
