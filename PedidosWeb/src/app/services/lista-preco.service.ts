import { ListaPreco } from './../class/lista-preco';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class ListaPrecoService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<ListaPreco[]>(environment.api + 'ListaPreco/buscartodos');
  }

  async gravar(listapreco: ListaPreco) {
    const json = JSON.stringify(listapreco);
    const result: any = await Api.post('ListaPreco/gravar', json);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async excluir(listapreco: ListaPreco) {
    const json = JSON.stringify(listapreco);
    const result: any = await Api.post('ListaPreco/deletar', json);
    if (result) {
      return result;
    } else {
      return '';
    }
  }
}
