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
    console.log(Pedido);
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
      this.http.get('api/Pedido/buscarPorId/' + Codigo).subscribe(result => {
        console.log(result);
        resolve(result);
      });
    })
  }

}
