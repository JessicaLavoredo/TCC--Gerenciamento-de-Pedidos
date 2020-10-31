import { Pedido } from './../class/pedido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Api from './Api';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  public buscarTodos(){
    return this.http.get<Pedido[]>(environment.api + 'Pedido/buscartodos');
  }

  async gravar(Pedido: Pedido){
    const json = JSON.stringify(Pedido);
    const result: any =  await Api.post('Pedido/gravar', json);
    if (result.length > 0){
        console.log(result);
        return true;
      }else{
      return false;
      }
    }
}
