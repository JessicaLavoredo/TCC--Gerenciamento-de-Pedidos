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
    return this.http.get<Produto[]>('api/Produto/buscartodos');
  }

  async gravar(Produto: Produto) {
    return new Promise(resolve => {
      const json = JSON.stringify(Produto);
      this.http.post('api/Produto/gravar', json).subscribe(result => {
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

  async BuscarPorFiltro(Filtros: any) {
    return new Promise(resolve => {
      const json = JSON.stringify(Filtros);
      this.http.post('api/Produto/buscarPorFiltro', json).subscribe(result => {
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

  async BuscarPorId(Codigo: String) {
    return new Promise(resolve => {
      if (!Codigo) {
        resolve("Codigo Indefinido");
      } else {
        this.http.get('api/Produto/buscarPorId/' + Codigo).subscribe(result => {
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
      }
    })
  }
}
