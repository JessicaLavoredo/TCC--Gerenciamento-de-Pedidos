import { Produto } from './../class/produto';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private http: HttpClient) { }

  public buscarTodos() {
    return this.http.get<Produto[]>(environment.api + 'Produto/buscartodos');
  }

  async gravar(Produto: Produto) {
    const json = JSON.stringify(Produto);
    const result: any = await Api.post('Produto/gravar', json);
    if (result) {
      return result;
    }
  }
}
