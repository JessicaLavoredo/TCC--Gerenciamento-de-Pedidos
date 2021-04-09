import { Vinculo } from './../class/vinculo';
import { Cidade } from './../Class/cidade';
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
export class PessoaService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<Pessoa[]>(environment.api + 'Pessoa/buscartodos');
  }

  async gravar(pessoa: Pessoa) {
    const json = JSON.stringify(pessoa);
    const result: any = await Api.post('Pessoa/gravar', json);
    if (result.length > 0) {
      return result;
    }
  }

  buscaPorCEP(Cep: String) {
    return new Promise(resolve => {
      this.http.get('//viacep.com.br/ws/' + Cep + '/json/').subscribe(result => {
        resolve(result);
      });
    })
  }

  public buscarTodasCidades() {
    return this.http.get<Cidade[]>(environment.api + '/Cidade/buscartodos');
  }

  public buscarTodosCatEnderecos() {
    return this.http.get<CategoriaEndereco[]>(environment.api + '/CategoriaEndereco/buscartodos');
  }

  public buscarTodosCatEmails() {
    return this.http.get<CategoriaEmail[]>(environment.api + '/CategoriaEmail/buscartodos');
  }

  public buscarTodosCatTelefones() {
    return this.http.get<CategoriaTelefone[]>(environment.api + '/CategoriaTelefone/buscartodos');
  }

  public buscarTodosVinculos() {
    return this.http.get<Vinculo[]>(environment.api + '/Vinculo/buscartodos');
  }

  async BuscarPorFiltro(Filtros: any) {
    const json = JSON.stringify(Filtros);
    const result: any = await Api.post('/Pessoa/buscarPorFiltro', json);
    if (result.data) {
      return result.data;
    }

  }
}
