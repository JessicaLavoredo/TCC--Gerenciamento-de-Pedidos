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
    return this.http.get<Pedido[]>(environment.api + 'Pedido/buscartodos');
  }

  async gravar(Pedido: Pedido) {
    const json = JSON.stringify(Pedido);
    const result: any = await Api.post('Pedido/gravar', json);
    if (result.length > 0) {
      console.log(result);
      return true;
    } else {
      return false;
    }
  }

  public buscarTodasFormasPagamento() {
    return this.http.get<FormaPagamento[]>(environment.api + 'FormaPagamento/buscartodos');
  }


}
