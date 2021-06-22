import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormaPagamento } from '../class/forma-pagamento';
import { Pedido } from '../class/pedido';
import Api from './Api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }
  public buscarTodos() {
    return this.http.get<Pedido[]>('api/Pedido/buscartodos');
  }

  async gravar(Pedido: Pedido) {
    return new Promise(resolve => {
      const json = JSON.stringify(Pedido);
      this.http.post('api/Pedido/gravar', json).subscribe(result => {
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

  public buscarTodasFormasPagamento() {
    return this.http.get<FormaPagamento[]>('api/FormaPagamento/buscartodos');
  }

  async BuscarPorId(Codigo: String) {
    return new Promise(resolve => {
      if (!Codigo) {
        resolve("Codigo Indefinido");
      } else {
        this.http.get('api/Pedido/buscarPorId/' + Codigo).subscribe(result => {
          let resultado = {
            resultado: result,
            status: 200
          };
          resolve(resultado);
        }, error => {
          console.log(error);
          let resultado = {
            resultado: error,
            status: 401
          };
          resolve(resultado);
        })
      }
    })

  }

  public buscarTodosStatus() {
    return this.http.get<any[]>('api/StatusPedido/buscartodos');
  }

  async BuscarPorFiltro(Filtros: any) {
    return new Promise(resolve => {
      const json = JSON.stringify(Filtros);
      this.http.post('api/Pedido/buscarPorFiltro', json).subscribe(result => {
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
