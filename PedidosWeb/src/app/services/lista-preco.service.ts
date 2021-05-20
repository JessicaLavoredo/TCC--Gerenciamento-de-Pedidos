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
    return this.http.get<ListaPreco[]>('api/ListaPreco/buscartodos');
  }

  async gravar(listapreco: ListaPreco) {
    return new Promise(resolve => {
      const json = JSON.stringify(listapreco);
      this.http.post('api/ListaPreco/gravar', json).subscribe(result => {
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

  async excluir(listapreco: ListaPreco) {
    return new Promise(resolve => {
      const json = JSON.stringify(listapreco);
      this.http.post('api/ListaPreco/deletar', json).subscribe(result => {
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
}
